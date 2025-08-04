import { connectDB } from '@/lib/db';
import TaskAttempt from '@/models/TaskAttempt';
import User from '@/models/User';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const attemptId = searchParams.get('attemptId');
  
  await connectDB();
  
  try {
    // In production: Generate AI questions based on task content
    const questions = [
      "Explain your approach to solving this problem?",
      "What alternative methods did you consider?",
      "How would you extend this solution?"
    ];
    
    return new Response(JSON.stringify({ questions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to get questions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  const { attemptId, answers, userId } = await req.json();
  
  await connectDB();
  
  try {
    // Calculate score (simple version)
    const score = calculateScore(answers);
    
    // Update task attempt
    const attempt = await TaskAttempt.findByIdAndUpdate(attemptId, {
      defense: {
        questions: [], // Should come from GET request
        answers,
        score
      },
      pointsAwarded: score > 70 ? 100 : score > 40 ? 50 : 0,
      status: 'completed'
    }, { new: true });
    
    // Update user points
    if (attempt.pointsAwarded > 0) {
      await User.findByIdAndUpdate(userId, {
        $inc: { points: attempt.pointsAwarded }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true,
      score
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Evaluation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Simple scoring logic
function calculateScore(answers) {
  let score = 80; // Base score
  
  answers.forEach(answer => {
    if (!answer || answer.length < 20) score -= 15;
    if (answer.length > 100) score += 5;
  });
  
  return Math.min(100, Math.max(0, score));
}
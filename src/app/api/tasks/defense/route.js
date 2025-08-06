import { connectDB } from '@/lib/db';
import TaskAttempt from '@/models/TaskAttempt';
import User from '@/models/User';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const attemptId = searchParams.get('attemptId');
  
  await connectDB();
  
  try {
    return new Response(JSON.stringify({ 
      questions: [
        "Explain your approach to solving this problem?",
        "What alternative methods did you consider?",
        "How would you extend this solution?"
      ]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      questions: [
        "Explain your approach to solving this problem?",
        "What alternative methods did you consider?",
        "How would you extend this solution?"
      ]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  await connectDB();
  
  try {
    const { attemptId, answers, userId } = await req.json();
    
    // Validate required fields
    if (!attemptId || !answers || !Array.isArray(answers) || !userId) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Missing required fields: ' + 
          (!attemptId ? 'attemptId ' : '') +
          (!answers ? 'answers ' : '') +
          (!userId ? 'userId' : '')
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Calculate score based on answer quality
    const score = calculateScore(answers);
    const pointsAwarded = calculatePoints(score);
    
    // Update task attempt
    const updatedAttempt = await TaskAttempt.findByIdAndUpdate(
      attemptId,
      {
        defense: { answers, score },
        pointsAwarded,
        status: 'completed',
        completedAt: new Date()
      },
      { new: true }
    );
    
    if (!updatedAttempt) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Task attempt not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Update user points
    if (pointsAwarded > 0) {
      await User.findByIdAndUpdate(userId, {
        $inc: { points: pointsAwarded }
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
    console.error('Defense submission error:', error.message);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message || 'Evaluation failed'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function calculateScore(answers) {
  let score = 0;
  const pointsPerQuestion = 100 / answers.length;
  
  answers.forEach(answer => {
    if (!answer || answer.trim().length < 10) return;
    
    let questionScore = pointsPerQuestion * 0.5;
    const length = answer.trim().length;
    
    if (length > 30) questionScore += pointsPerQuestion * 0.3;
    if (length > 100) questionScore += pointsPerQuestion * 0.2;
    
    score += questionScore;
  });
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

function calculatePoints(score) {
  if (score >= 80) return 100;
  if (score >= 60) return 75;
  if (score >= 40) return 50;
  return 25;
}
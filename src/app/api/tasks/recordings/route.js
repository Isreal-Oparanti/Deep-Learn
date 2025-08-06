import { connectDB } from '@/lib/db';
import TaskAttempt from '@/models/TaskAttempt';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    await connectDB();

    // Create uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Get form data using manual parsing
    const formData = await request.formData();
    const recordingFile = formData.get('recording');
    const duration = formData.get('duration');
    const anomalies = formData.get('anomalies');
    const userId = formData.get('userId');

    // Validate required fields
    if (!userId || !duration || !recordingFile) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert to buffer
    const buffer = await recordingFile.arrayBuffer();
    const fileName = `recording-${Date.now()}.webm`;
    const filePath = path.join(uploadDir, fileName);

    // Save file
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // Create task attempt
    const taskAttempt = new TaskAttempt({
      userId,
      recording: {
        duration: parseInt(duration),
        anomalies: anomalies ? JSON.parse(anomalies) : [],
        url: `/uploads/${fileName}`,
        faceVisiblePercentage: 85
      },
      status: 'defense'
    });

    await taskAttempt.save();

    return new Response(JSON.stringify({ 
      success: true,
      attemptId: taskAttempt._id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error saving recording:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
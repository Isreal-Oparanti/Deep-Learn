import { connectDB } from '@/lib/db';
import TaskAttempt from '@/models/TaskAttempt';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  // Get user session
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await connectDB();

  // Parse form data
  const Formidable = require('formidable');
  const form = new Formidable.IncomingForm();
  
  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Extract data
    const duration = fields.duration[0];
    const anomalies = JSON.parse(fields.anomalies[0]);
    const userId = session.user.id;
    const recordingFile = files.recording[0];

    // In production: Save file to cloud storage and get URL
    // For demo, just save metadata
    const recordingUrl = `/recordings/${recordingFile.newFilename}`;

    // Create task attempt
    const taskAttempt = new TaskAttempt({
      userId,
      recording: {
        duration,
        anomalies,
        url: recordingUrl,
        faceVisiblePercentage: 85 // Simulated value
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
// import { connectDB } from '@/lib/db';
// import TaskAttempt from '@/models/TaskAttempt';

// export async function POST(req) {
//   await connectDB();
  
//   try {
//     const { userId, taskId, duration, anomalies, faceVisiblePercentage } = await req.json();
    
//     const attempt = new TaskAttempt({
//       userId,
//       taskId,
//       recording: {
//         duration,
//         anomalies,
//         faceVisiblePercentage
//       },
//       status: 'defense' // Move to next stage
//     });
    
//     await attempt.save();
    
//     return new Response(JSON.stringify({
//       success: true,
//       attemptId: attempt._id
//     }), { status: 200 });
    
//   } catch (error) {
//     return new Response(JSON.stringify({
//       success: false,
//       error: "Failed to save recording data"
//     }), { status: 500 });
//   }
// }
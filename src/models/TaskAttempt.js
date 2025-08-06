import mongoose from 'mongoose';

const TaskAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  recording: {
    duration: Number, // in seconds
    anomalies: [String], // list of detected anomalies
    url: String, // URL to recording file
    faceVisiblePercentage: Number, // 0-100%
    startedAt: Date,
    endedAt: Date
  },
  defense: {
    questions: [String],
    answers: [String],
    score: Number // 0-100%
  },
  status: {
    type: String,
    enum: ['pending', 'recording', 'defense', 'completed'],
    default: 'pending'
  },
  pointsAwarded: Number
}, { timestamps: true });

export default mongoose.models.TaskAttempt || mongoose.model('TaskAttempt', TaskAttemptSchema);
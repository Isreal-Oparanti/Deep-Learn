import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  points: Number,
  expectedDuration: Number 
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
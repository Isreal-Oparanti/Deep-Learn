import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { 
      type: String, 
      enum: ["student", "guest"], 
      default: "student" 
    },
    matricNumber: String,
    course: String,
    session: String,
    interestedCourses: { type: [String], default: [] },
    organization: String,
    position: String,
    points: { type: Number, default: 0 }, // Added points field
    taskAttempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskAttempt' }]
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
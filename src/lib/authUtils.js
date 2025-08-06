import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectDB } from './db';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (token) => {
  await connectDB();
  
  try {
    if (!token) return null;
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) return null;
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};
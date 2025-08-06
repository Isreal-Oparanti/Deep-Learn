// lib/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const getUserFromToken = (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
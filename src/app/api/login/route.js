import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { identifier, password, session } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email/Matric number and password are required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { matricNumber: identifier }],
    }).select('+password'); // Important: include password field

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    if (
      user.role === "student" &&
      user.session &&
      session &&
      user.session !== session
    ) {
      return NextResponse.json(
        { success: false, message: "Session does not match" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    }

    // Create response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      matricNumber: user.matricNumber,
      session: user.session,
      points: user.points
    };

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userResponse
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
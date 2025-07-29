import { getUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const user = await getUserFromToken(token);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { selectedCourses } = body;

  const updatedUser = await User.findByIdAndUpdate(
    user.userId,
    { interestedCourses: selectedCourses },
    { new: true }
  );

  return NextResponse.json({ success: true, data: updatedUser });
}

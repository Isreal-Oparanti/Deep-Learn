import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Clear the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}
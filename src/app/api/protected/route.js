import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/authUtils';

export async function GET(request) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || null;
    
    // Verify token
    const user = await verifyToken(token);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: `Hello ${user.name}, this is protected content!`
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}   
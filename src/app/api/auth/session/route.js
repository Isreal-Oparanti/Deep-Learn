import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/authUtils';

export async function GET(request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || null;
    
    // Verify token
    const user = await verifyToken(token);
    
    return NextResponse.json({
      authenticated: !!user,
      user
    });
    
  } catch (error) {
    return NextResponse.json({
      authenticated: false,
      user: null
    });
  }
}
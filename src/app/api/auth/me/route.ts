import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { UserData } from '@/types/auth';
import { getUserDataFromToken } from '@/utils/auth';

export async function GET() {
  try {
    const cookieStore = cookies();

    const tokenCookie = (await cookieStore).get('token');
    
    if (!tokenCookie) {
      return NextResponse.json(
        { message: 'Authentication token not found.' },
        { status: 401 }
      );
    }

    const token = tokenCookie.value;

    const user: UserData | null = getUserDataFromToken(token);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or malformed token.' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });

  } catch (error) {
    console.error('API /auth/me error:', error);
    return NextResponse.json(
      { message: 'Invalid or malformed token.' },
      { status: 401 }
    );
  }
}
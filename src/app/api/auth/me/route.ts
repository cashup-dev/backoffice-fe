import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Authentication token not found.' },
        { status: 401 },
      );
    }

    const roles =
      ((session as any)?.roles as string[] | undefined)?.map((role) => ({
        authority: role,
      })) ?? [];

    const username =
      (session as any)?.preferred_username ||
      session.user.name ||
      session.user.email ||
      'User';

    return NextResponse.json({
      user: {
        username,
        id: session.user.email || session.user.name || username,
        roles,
      },
    });
  } catch (error) {
    console.error('API /auth/me error:', error);
    return NextResponse.json(
      { message: 'Invalid or malformed token.' },
      { status: 401 },
    );
  }
}

import { NextResponse } from 'next/server';
import { getTokenData } from '@/lib/auth';

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  const user = token ? getTokenData(token) : null;

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: `Hello ${user.name} (@${user.username})`
  });
}
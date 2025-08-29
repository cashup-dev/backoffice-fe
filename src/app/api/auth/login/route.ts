import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '../../../../utils/apiServer';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await apiServer.post('/user/login', body);
    const token = res.data.data.token;
    const response = NextResponse.json({ success: true });

    response.cookies.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Login gagal' }, { status: 401 });
  }
}

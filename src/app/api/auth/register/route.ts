import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '../../../../utils/apiServer';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const res = await apiServer.post('/user/register', body);
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: 'Register gagal' }, { status: 400 });
  }
}

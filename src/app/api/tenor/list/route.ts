import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '@/utils/apiServer';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ message: 'Authorization token is missing' }, { status: 401 });
  }

  try {
    const res = await apiServer.get('/tenor/list', {
      headers: {
        Authorization: token,
      },
    });
    
    // Pastikan struktur respons sesuai dengan yang Anda harapkan
    return NextResponse.json({
      message: 'Tenor list fetched successfully',
      data: res.data.data,
    });
  } catch (err: any) {
    console.error('Fetch Tenor List Error:', err);
    return NextResponse.json(
      {
        error: 'FETCH_TENOR_FAILED',
        message: err?.response?.data?.message || 'Failed to fetch tenor list',
      },
      { status: err?.response?.status || 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '../../../../utils/apiServer';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await apiServer.post('/promo/create', body);
    return NextResponse.json({
      message: 'Promo created successfully',
      data: res.data.data,
    });
  } catch (err: any) {
    console.error('Create Promo Error:', err);
    return NextResponse.json(
      {
        error: 'CREATE_PROMO_FAILED',
        message: err?.response?.data?.message || 'Failed to create promo',
      },
      { status: err?.response?.status || 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '@/utils/apiServer'; // Menggunakan alias path '@' lebih bersih

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise <{ id: string }> } // Tipe parameter yang benar untuk App Router
) {
  const { id } = await params; // Mengambil ID langsung dari params
  const body = await req.json();
  
  // Mengambil token dari header permintaan yang datang dari frontend
  const token = req.headers.get('Authorization');

  // Validasi: Pastikan token ada
  if (!token) {
    return NextResponse.json({ message: 'Authorization token is missing' }, { status: 401 });
  }

  try {
    // Meneruskan permintaan PUT ke server backend DENGAN menyertakan token
    const res = await apiServer.put(`/installment/update/${id}`, body, {
      headers: {
        Authorization: token, // <-- Token disertakan di sini
        'Content-Type': 'application/json',
      },
    });

    // Mengembalikan respons sukses dari backend ke frontend
    return NextResponse.json({
      message: 'Installment updated successfully',
      data: res.data.data,
    });

  } catch (err: any) {
    console.error(`Update Installment Error for ID ${id}:`, err.response?.data || err.message);
    return NextResponse.json(
      {
        error: 'UPDATE_INSTALLMENT_FAILED',
        message: err?.response?.data?.message || 'Failed to update installment',
      },
      { status: err?.response?.status || 500 }
    );
  }
}
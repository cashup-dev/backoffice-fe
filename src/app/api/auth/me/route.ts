import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

// Definisikan tipe data untuk payload token agar lebih aman dan jelas
// Sesuaikan dengan payload yang ada di JWT lo
interface TokenPayload {
  id: number;
  username: string;
  role: string;
  partnerId: number;
  // Biasanya ada iat (issued at) and exp (expiration time) juga
  iat: number;
  exp: number;
  sub: string; // Biasanya ini adalah username atau email
}

// Definisikan tipe data untuk user yang akan dikirim ke client
// Sebaiknya tidak semua data dari token dikirim, hanya yang perlu saja
export interface UserData {
  id: number;
  username: string;
  role: string;
  partnerId: number;
}


export async function GET() {
  // Gunakan 'try-catch' untuk menangani error secara global, 
  // misalnya jika cookie tidak ada atau token tidak valid.
  try {
    // 1. Ambil cookie store dari server-side headers
    const cookieStore = cookies();

    // 2. Cari cookie dengan nama 'token'
    const tokenCookie = (await cookieStore).get('token');
    // 3. Jika cookie tidak ditemukan, artinya user belum login. Kirim response 401.
    if (!tokenCookie) {
      return NextResponse.json(
        { message: 'Authentication token not found.' },
        { status: 401 }
      );
    }

    const token = tokenCookie.value;

    // 4. Decode token untuk mendapatkan payload (data user)
    // jwtDecode akan error jika format token salah, ini akan ditangkap oleh 'catch'
    const decodedToken = jwtDecode<TokenPayload>(token);
        console.log('Decoded Token', decodedToken);

    // [Opsional tapi SANGAT DIREKOMENDASIKAN]
    // Cek apakah token sudah expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
        // Hapus cookie jika sudah expired
        (await cookieStore).delete('token');
        return NextResponse.json(
            { message: 'Token has expired.' },
            { status: 401 }
        );
    }

    // console.log('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdWhhbW1hZGVybGFuZ2dhOTkiLCJpZCI6NywiaWF0IjoxNzUwMzUwOTMyLCJleHAiOjE3NTA5NTU3MzJ9.diomjDXhVa1d3DUaGMJyhrhF_IbeJIYBBmBeqaPRGPc', decodedToken);
    // 5. Siapkan data user yang akan dikirim ke client
    const user: UserData = {
      id: decodedToken.id,
      username: decodedToken.sub,
      role: decodedToken.role,
      partnerId: decodedToken.partnerId,
    };

    // 6. Kirim data user dengan response 200 OK
    return NextResponse.json({ user });

  } catch (error) {
    console.error('API /auth/me error:', error);
    // Jika terjadi error (misal token invalid), kirim response 401
    return NextResponse.json(
      { message: 'Invalid or malformed token.' },
      { status: 401 }
    );
  }
}
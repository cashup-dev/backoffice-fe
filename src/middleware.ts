import { sign } from 'jsonwebtoken';
// file: middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { json } from 'stream/consumers';

const protectedRoutes = ['/', '/profile'] // Rute yang perlu proteksi
const authRoutes = ['/signin', '/signup'] // Rute autentikasi

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('token')?.value
  console.log('Access Token:', accessToken?.length);
  // Jika mencoba akses rute protected tanpa token
  if (protectedRoutes.includes(pathname)) {
    if (!accessToken) {
      const signinUrl = new URL('/signin', request.url)
    //   signinUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(signinUrl)
    }

    try {
      // Verifikasi token (gunakan library JWT atau API route)
      // Contoh sederhana, sebaiknya panggil API route untuk verifikasi
      // const isValid = await verifyToken(accessToken)
      // if (!isValid) throw new Error('Invalid token')
    } catch (err) {
      // Token tidak valid
      const signinUrl = new URL('/signin', request.url)
      signinUrl.searchParams.set('error', 'session_expired')
      const response = NextResponse.redirect(signinUrl)
      response.cookies.delete('accessToken')
      return response
    }
  }

  // Jika sudah signin tapi mencoba akses rute auth
  if (authRoutes.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Config untuk menentukan rute yang akan diproses middleware
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/signin',
    '/signup',
    '/forgot-password',
  ],
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/profile',
  '/bin-management',
  '/eligibility-management',
  '/merchant-management',
  '/promo-management',
  '/usage-history'
] // Rute yang perlu proteksi
const authRoutes = ['/signin', '/signup'] // Rute autentikasi

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('token')?.value

  if (pathname === '/' || protectedRoutes.some((route) => pathname.startsWith(route))) {
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
    '/signin',
    '/signup',
    '/profile',
    '/bin-management',
    '/eligibility-management',
    '/merchant-management',
    '/promo-management',
    '/usage-history',
    '/profile/:path*',
    '/bin-management/:path*',
    '/eligibility-management/:path*',
    '/merchant-management/:path*',
    '/promo-management/:path*',
    '/usage-history/:path*'
  ],
}
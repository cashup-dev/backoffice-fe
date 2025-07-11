import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserData } from './types/auth'
import { getUserDataFromToken } from './utils/auth'

const protectedRoutes = [
  '/profile',
  '/bin-management',
  '/eligibility-management',
  '/merchant-management',
  '/promo-management',
  '/usage-history'
]

const adminOnlyRoutes = [
  '/promo-management/merchant-bind',
  '/promo-management/bin-bind',
  '/promo-management/edit',
]
const authRoutes = ['/signin', '/signup']

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('token')?.value

  if (pathname === '/' || protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!accessToken) {
      const signinUrl = new URL('/signin', request.url)
      return NextResponse.redirect(signinUrl)
    }

    try {
          const user: UserData | null = getUserDataFromToken(accessToken);

          if (!user) {
            return NextResponse.json(
              { message: 'Invalid or malformed token.' },
              { status: 401 }
            );
          }

          if (adminOnlyRoutes.includes(pathname) && !user.roles.some(role => role.authority === 'ADMIN')) {
            return NextResponse.redirect(new URL('/error-403', request.url));
          }
      
    } catch (err) {
      const signinUrl = new URL('/signin', request.url)
      signinUrl.searchParams.set('error', 'session_expired')
      const response = NextResponse.redirect(signinUrl)
      response.cookies.delete('accessToken')
      return response
    }
  }

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
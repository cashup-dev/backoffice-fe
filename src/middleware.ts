export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|signin|signup|error-403|error-404).*)',
  ],
};

import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    roles?: string[];
    preferred_username?: string;
    error?: string;
  }

  interface User {
    roles?: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expires_at?: number;
    roles?: string[];
    preferred_username?: string;
    name?: string;
    email?: string;
    error?: string;
  }
}

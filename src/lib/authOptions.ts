import { jwtDecode } from 'jwt-decode';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

type KeycloakToken = {
  preferred_username?: string;
  name?: string;
  email?: string;
  realm_access?: {
    roles?: string[];
  };
};

const issuer = process.env.KEYCLOAK_ISSUER;
const clientId = process.env.KEYCLOAK_CLIENT_ID;
const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  if (!token.refreshToken || !issuer || !clientId || !clientSecret) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }

  try {
    const url = `${issuer}/protocol/openid-connect/token`;
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: String(token.refreshToken),
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const decoded = jwtDecode<KeycloakToken>(refreshedTokens.access_token);

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      expires_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
      roles: decoded.realm_access?.roles ?? token.roles,
      preferred_username: decoded.preferred_username ?? token.preferred_username,
      name: decoded.name ?? token.name,
      email: decoded.email ?? token.email,
      error: undefined,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    KeycloakProvider({
      clientId: clientId ?? '',
      clientSecret: clientSecret ?? '',
      issuer,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
      }

      if (token.accessToken) {
        const decoded = jwtDecode<KeycloakToken>(String(token.accessToken));
        token.roles = decoded.realm_access?.roles ?? token.roles;
        token.preferred_username =
          decoded.preferred_username ?? token.preferred_username;
        token.name = decoded.name ?? token.name ?? token.preferred_username;
        token.email = decoded.email ?? token.email;
      }

      const shouldRefresh =
        typeof token.expires_at === 'number' &&
        Date.now() / 1000 > token.expires_at - 60;

      if (shouldRefresh) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        name:
          (token.name as string) ||
          session.user?.name ||
          (token.preferred_username as string) ||
          undefined,
        email:
          (token.email as string) ||
          session.user?.email ||
          undefined,
      };

      (session as any).accessToken = token.accessToken;
      (session as any).roles = token.roles ?? [];
      (session as any).preferred_username = token.preferred_username;

      if (token.error) {
        (session as any).error = token.error;
      }

      return session;
    },
  },
};

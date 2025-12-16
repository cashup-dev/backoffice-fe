import { TokenPayload, UserData } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = async (): Promise<UserData | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const response = await fetch('/api/auth/session', { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }

    const session = await response.json();
    if (!session?.user) {
      return null;
    }

    const roles =
      (session.roles as string[] | undefined)?.map((role) => ({
        authority: role,
      })) ?? [];

    const username =
      session.preferred_username ||
      session.user.name ||
      session.user.email ||
      'User';

    return {
      id: session.user.email || session.user.name || username,
      username,
      roles,
      partnerId: undefined,
      partnerName: undefined,
    };
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const getUserDataFromToken = (token: string): UserData | null => {
  try {
    const decodedToken = jwtDecode<TokenPayload>(token);

    const roles =
      (decodedToken as any)?.realm_access?.roles ??
      decodedToken.roles?.map((role) =>
        typeof role === 'string' ? role : role.authority,
      ) ??
      [];

    const user: UserData = {
      id: decodedToken.id ?? decodedToken.sub,
      username:
        (decodedToken as any).preferred_username ??
        decodedToken.sub ??
        decodedToken.id,
      roles: roles.map((role: string) => ({ authority: role })),
      partnerId: decodedToken.partnerId,
      partnerName: decodedToken.partnerName,
    };

    return user;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

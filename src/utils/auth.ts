import { TokenPayload, UserData } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = async (): Promise<UserData | null> => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const response = await fetch('/api/auth/me');
    const responseData = await response.json();

    if (!response.ok) {
      console.log('Failed to fetch user data, user likely not logged in.');
      return null;
    }

    return responseData.user as UserData;

  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const getUserDataFromToken = (token: string): UserData | null => {
  try {
    const decodedToken = jwtDecode<TokenPayload>(token);

    const user: UserData = {
      id: decodedToken.id,
      username: decodedToken.sub,
      roles: decodedToken.roles,
      partnerId: decodedToken.partnerId, 
      partnerName:  decodedToken.partnerName
    };

    return user;

  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
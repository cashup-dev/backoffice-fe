export interface TokenPayload {
  sub: string;
  id: number;
  roles: Array<{ authority: string }>;
  iat: number;
  exp: number;
  partnerId?: number;
  partnerName?: string;
}

export interface UserData {
  id: number;
  username: string;
  roles: Array<{ authority: string }>;
  partnerId?: number;
  partnerName?: string; 
}
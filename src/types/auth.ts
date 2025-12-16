export interface TokenPayload {
  sub: string;
  id?: number | string;
  roles: Array<{ authority: string }>;
  iat: number;
  exp: number;
  partnerId?: number;
  partnerName?: string;
}

export interface UserData {
  id?: number | string;
  username: string;
  roles: Array<{ authority: string }>;
  partnerId?: number;
  partnerName?: string; 
}

"use client";

import { jwtDecode } from "jwt-decode";
import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

interface TokenPayload {
  sub: string;
  id: number;
  roles: Array<{ authority: string }>;
  iat: number;
  exp: number;
  partnerId?: number;
  partnerName?: string;
}

type User = {
  id: number;
  username: string;
  roles: Array<{ authority: string }>;
  partnerId?: number;
  partnerName?: string;
};

type AuthContextType = {
  user?: User;
  setUser: (user: User) => void;
  isAdmin?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getTokenFromCookie = () => {
      const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
      return match ? match[2] : undefined;
    };

    const token = getTokenFromCookie();

    if (!token) return;

    const decodedToken = jwtDecode<TokenPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return;
    }

    const user: User = {
      id: decodedToken.id,
      username: decodedToken.sub,
      roles: decodedToken.roles,
      partnerId: decodedToken.partnerId,
      partnerName: decodedToken.partnerName,
    };

    setUser(user);
  }, []);

  const isAdmin = user?.roles.some((role) => role.authority === "ADMIN");

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

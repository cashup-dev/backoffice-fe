"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCurrentUser } from "../../../lib/auth";

export default function UserMetaCard() {
  const [user, setUser] = useState<{
    id: number;
    username: string;
    roles: Array<{ authority: string }>; // roles array
    partnerId?: number;
    partnerName?: string; // Optional, if you want to include it
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      if (userData) {
        setUser({
          id: userData.id,
          username: userData.username,
          roles: userData.roles.map(
            (role: { authority: any }) => role.authority
          ),
          partnerId: userData.partnerId,
          partnerName: userData.partnerName
        });
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image
                width={80}
                height={80}
                src="/images/user.svg"
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user ? user.username : "Random User"}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user ? user.roles.join(", ") : "User Role"}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user ? user.partnerName : "Partner"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

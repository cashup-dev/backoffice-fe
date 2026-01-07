"use client";
import React, { useState } from "react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface WelcomeBannerProps {
  userName?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName = "admin2" }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 dark:bg-blue-950/20 dark:border-blue-900/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <InformationCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {getGreeting()} <span className="font-semibold text-gray-900 dark:text-white">{userName}</span>, welcome back!!
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 dark:text-gray-400 transition-colors"
          aria-label="Close welcome banner"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;

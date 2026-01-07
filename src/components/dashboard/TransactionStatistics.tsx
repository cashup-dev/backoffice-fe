"use client";
import React from "react";
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

interface StatisticItem {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

const TransactionStatistics: React.FC = () => {
  const statistics: StatisticItem[] = [
    {
      label: "SUCCESS",
      value: "361.486",
      color: "#10B981",
      icon: <CheckCircleIcon className="w-10 h-10" />,
      iconBgColor: "bg-green-100 dark:bg-green-950/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "DECLINED",
      value: "357.612",
      color: "#EF4444",
      icon: <XCircleIcon className="w-10 h-10" />,
      iconBgColor: "bg-red-100 dark:bg-red-950/20",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      label: "REFUND",
      value: "218.839",
      color: "#3B82F6",
      icon: <ArrowPathIcon className="w-10 h-10" />,
      iconBgColor: "bg-blue-100 dark:bg-blue-950/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Transaction Statistics
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Transaction statistics in this month
      </p>

      <div className="space-y-6">
        {statistics.map((stat, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-16 h-16 rounded-full ${stat.iconBgColor}`}>
              <div className={stat.iconColor}>
                {stat.icon}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionStatistics;

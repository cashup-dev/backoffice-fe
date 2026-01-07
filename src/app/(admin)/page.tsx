import type { Metadata } from "next";
import React from "react";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import TransactionCards from "@/components/dashboard/TransactionCards";
import MonthlyTransactionsChart from "@/components/dashboard/MonthlyTransactionsChart";
import TransactionStatistics from "@/components/dashboard/TransactionStatistics";

export const metadata: Metadata = {
  title: "Dashboard - Backoffice cashUP",
  description: "cashUP Backoffice Dashboard",
};

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner userName="admin2" />

      {/* Transaction Cards */}
      <TransactionCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Monthly Transactions Chart - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <MonthlyTransactionsChart />
        </div>

        {/* Transaction Statistics - Takes 1 column on xl screens */}
        <div className="xl:col-span-1">
          <TransactionStatistics />
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  BoxIconLine, 
  GroupIcon, 
  CheckCircleIcon,
} from "@/icons";
import { Activity, Tag, X } from "lucide-react";

interface PromoStats {
  totalActivePromos: number;
  successfulTransactions: number;
  failedTransactions: number;
  totalTransactions: number;
  successRate: number;
}

export const EcommerceMetrics = () => {
  const [stats, setStats] = useState<PromoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/promo/stats');
        const json = await res.json();
        
        if (!res.ok) throw new Error(json.message || 'Failed to fetch stats');
        
        setStats(json.data.data);
      } catch (err: any) {
        setError(err.message);
        console.error('Failed to fetch promo stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"></div>
              <div className="mt-5 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-6 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <p>No data available</p>
      </div>
    );
  }

  // TODO: we may need to calculate changes for each metric
  // const activePromosChange = 5.2; // Example percentage
  // const successChange = Math.round((stats.successRate - 85) * 10) / 10; // Example calculation
  // const failureChange = -2.4; // Example percentage
  // const totalChange = 8.7; // Example percentage

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Active Promos Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Tag className="text-amber-400 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Active Promos
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.totalActivePromos.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Successful Transactions Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CheckCircleIcon className="text-green-600 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Successful Transaction
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.successfulTransactions.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Failed Transactions Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <X className="text-red-400 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Failed Transactions
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.failedTransactions.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Total Transactions Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Activity className="text-blue-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Transactions
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.totalTransactions.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
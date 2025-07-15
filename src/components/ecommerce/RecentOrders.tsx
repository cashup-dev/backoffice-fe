'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Merchant {
  merchantId: number;
  merchantName: string;
  count: number;
}

export default function TopMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopMerchants = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/promo/stats');
        const json = await res.json();
        
        if (!res.ok) throw new Error(json.message || 'Failed to fetch merchant data');
        
        // Convert the object to array
        const topMerchants = json.data.data.top5Merchants;
        const merchantsArray = Object.values(topMerchants) as Merchant[];
        
        // Sort by count descending and take top 5
        const sortedMerchants = merchantsArray
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        
        setMerchants(sortedMerchants);
      } catch (err: any) {
        setError(err.message);
        console.error('Failed to fetch top merchants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMerchants();
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top 5 Merchant ⭐
          </h2>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800">
              <div className="w-1/3 h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-1/4 h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-1/4 h-4 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top 5 Merchant ⭐
          </h2>
        </div>
        <div className="text-red-500 p-4">{error}</div>
      </div>
    );
  }

  if (merchants.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top 5 Merchant ⭐
          </h2>
        </div>
        <div className="text-gray-500 p-4">No merchant data available</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top 5 Merchant ⭐
        </h2>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 pl-5 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Ranking
              </TableCell>
              <TableCell
                isHeader
                className="py-3 pl-10 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Merchant Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400 pr-10"
              >
                Transaction Count
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {merchants.map((merchant, index) => (
              <TableRow key={merchant.merchantId}>
                <TableCell className="py-[1.11rem] pl-5">
                  <Badge
                    size="sm"
                  >
                    #{index + 1}
                  </Badge>
                </TableCell>
                <TableCell className="py-[1.11rem] pl-10 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {merchant.merchantName}
                </TableCell>
                <TableCell className="py-[1.11rem] text-gray-500 text-theme-sm dark:text-gray-400 text-end pr-12">
                  {merchant.count.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
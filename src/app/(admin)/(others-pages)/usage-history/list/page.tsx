"use client";
import { useEffect, useState } from "react";
import UsageHistoryTable from "@/components/usage-history/UsageHistoryManagement";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import NoData from "@/components/bin-management/NoData";

export default function UsageHistoryPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [totalItems, setTotalItems] = useState(0);

  const fetchUsageHistory = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const res = await fetch("/api/usage-history/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          page: page, 
          pageSize: pageSize
        }),
      });
  
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
  
      setData(json.data.data.content || []);
      setTotalPages(json.data.data.totalPages || 0);
      setTotalItems(json.data.data.totalElements || 0);
    } catch (err: any) {
      toast.error("Gagal ambil data", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      fetchUsageHistory(newPage);
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
    fetchUsageHistory(0);
  };

  useEffect(() => {
    fetchUsageHistory();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Riwayat Penggunaan Promo</h1>
      
      {
      loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Memuat data...</p>
        </div>
      ) : (
        <>
          <UsageHistoryTable data={data} />
          
          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <div className="text-sm text-gray-600">
              Menampilkan {data.length} dari {totalItems} data
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                {(<ChevronsLeft size={16} />)}
              </button>
              
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                {(<ChevronLeft size={16} />)}
              </button>
              
              <span className="px-3 py-1">
                Halaman {currentPage + 1} dari {totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                {(<ChevronRight size={16} />)}
              </button>
              
              <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                {(<ChevronsRight size={16} />)}
              </button>
            </div>
          </div>
        </>
      )
      }
    </div>
  );
}
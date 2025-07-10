"use client";
import { useEffect, useState } from "react";
import EligibilityTable from "@/components/eligibility-management/EligibilityTable";
import Button from "@/components/ui/button/Button";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

export default function EligibilityManagementPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(15);
  const [totalItems, setTotalItems] = useState(0);
  const [uploading, setUploading] = useState(false);
  const {isAdmin} = useAuth();

  // Fungsi untuk generate batchId
  const generateBatchId = () => {
    const now = new Date();
    const pad = (num: number) => num.toString().padStart(2, '0');
    return [
      pad(now.getDate()),
      pad(now.getMonth() + 1),
      now.getFullYear(),
      pad(now.getHours()),
      pad(now.getMinutes()),
      pad(now.getSeconds())
    ].join('');
  };

  // Fungsi uploadCSV yang sudah diimplementasikan
  const uploadCSV = async (file: File) => {
    setUploading(true);
    try {
      const batchId = generateBatchId();
      // console.log('Generated Batch ID:', batchId);
      
      const formData = new FormData();
      formData.append("csvFile", file);
      
      const response = await fetch(`/api/eligibility/upload/${batchId}`, {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      
      toast.success(`Upload berhasil! Batch ID: ${batchId}`);
      await fetchEligibility();
      return result;
    } catch (err: any) {
      toast.error("Upload gagal", { description: err.message });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const fetchEligibility = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const res = await fetch("/api/eligibility/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, pageSize }),
      });
  
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
  
      setData(json.data?.data?.content || []);
      setTotalPages(json.data?.data?.totalPages || 0);
      setTotalItems(json.data?.data?.totalElements || 0);
    } catch (err: any) {
      toast.error("Gagal ambil data", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.txt";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          await uploadCSV(file);
        } catch (error) {
          console.error("Upload error:", error);
        }
      }
    };
    input.click();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      fetchEligibility(newPage);
    }
  };

  useEffect(() => {
    fetchEligibility();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {isAdmin && (
        <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Eligibility Management</h1>
        <Button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Mengupload..." : "📤 Upload Eligibility CSV"}
        </Button>
      </div>
      )}
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <EligibilityTable data={data} />
          
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
                <ChevronsLeft size={16} />
              </button>
              
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              
              <span className="px-3 py-1">
                Halaman {currentPage + 1} dari {totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
              
              <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
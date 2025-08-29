"use client";
import React, { useEffect, useState, useCallback } from "react";
import InstallmentBinTable, { InstallmentBin } from "@/components/installment-bin/InstallmentBinTable";
// import NoData from "@/components/common/NoData";
import { toast } from "sonner";

export default function InstallmentBinManagementPage() {
  const [binList, setBinList] = useState<InstallmentBin[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchBins = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      // Panggil API route yang baru dibuat
      const res = await fetch("/api/installment-bin/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      setBinList(data.data || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch BINs", err);
      setErrorMsg(err.message || "Gagal ambil data");
      toast.error("Gagal ambil data", {
        description: err.message || "Terjadi kesalahan saat memuat BIN",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  const handleBinUnBinding = useCallback((bin: InstallmentBin) => {
    if (!bin?.installmentId || !bin?.binNumber) {
      toast.error("Data tidak lengkap", {
        description: "BIN Number atau Installment ID tidak ditemukan.",
      });
      return;
    }

    const installmentName = bin.installmentName || "-";
    const binNumber = bin.binNumber || "-";

    toast("🗑️ Konfirmasi Unbind BIN", {
      id: `confirm-unbind-${bin.id}`,
      description: `Apakah Anda yakin ingin menghapus BIN **${binNumber}** dari installment **"${installmentName}"**?`,
      action: {
        label: "✅ Unbind Sekarang",
        onClick: async () => {
          const toastId = toast.loading("🚧 Sedang melakukan unbind...");

          try {
            const token = document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1];
            
            // TODO: Buat API route ini
            const res = await fetch(`/api/installment-bin/unbind/${bin.installmentId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
              },
              body: JSON.stringify({
                binNumbers: [String(bin.binNumber)],
              }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Gagal unbind BIN");

            toast.success("", {
              description: `✅ BIN ${binNumber} berhasil dihapus dari installment.`,
              id: toastId,
            });

            setTimeout(() => {
              fetchBins();
            }, 500);
          } catch (err: any) {
            toast.error("❌ Gagal Unbind", {
              description: err.message || "Terjadi kesalahan teknis.",
              id: toastId,
            });
          }
        },
      },
      duration: 10000,
      dismissible: true,
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Installment - BIN Binding</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : binList.length > 0 ? (
        <InstallmentBinTable
          data={binList}
          onBinUnBinding={handleBinUnBinding}
        />
      ) : (
        <div className="text-center py-10 text-gray-500">
            <p>No bound BIN data found.</p>
        </div>
        // <NoData message="No bound BIN data found." />
      )}
    </div>
  );
}

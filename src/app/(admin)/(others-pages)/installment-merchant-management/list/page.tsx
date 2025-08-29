"use client";
import React, { useEffect, useState, useCallback } from "react";
import InstallmentMerchantTable, { InstallmentMerchant } from "@/components/installment-merchant-management/InstallmentMerchantTable";
// import NoData from "@/components/common/NoData"; // Anda bisa gunakan komponen NoData jika ada
import { toast } from "sonner";

export default function InstallmentMerchantManagementPage() {
  const [merchantList, setMerchantList] = useState<InstallmentMerchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      // Panggil API route yang baru dibuat
      const res = await fetch("/api/installment-merchant/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      setMerchantList(data.data || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch merchants", err);
      setErrorMsg(err.message || "Gagal ambil data");
      toast.error("Gagal ambil data", {
        description: err.message || "Terjadi kesalahan saat memuat merchant",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleMerchantUnBinding = useCallback((merchant: InstallmentMerchant) => {
    if (!merchant?.installmentId || !merchant?.merchantId) {
      toast.error("Data tidak lengkap", {
        description: "Merchant ID atau Installment ID tidak ditemukan.",
      });
      return;
    }

    const installmentName = merchant.installmentName || "-";
    const merchantName = merchant.merchantName || "-";

    toast("🗑️ Konfirmasi Unbind Merchant", {
      id: `confirm-unbind-${merchant.merchantId}`,
      description: `Apakah Anda yakin ingin menghapus merchant **${merchantName}** dari installment **"${installmentName}"**?`,
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
            const res = await fetch(`/api/installment-merchant/unbind/${merchant.installmentId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
              },
              body: JSON.stringify({
                merchantIds: [String(merchant.merchantId)],
              }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Gagal unbind merchant");

            toast.success("", {
              description: `✅ Merchant ${merchantName} berhasil dihapus dari installment.`,
              id: toastId,
            });

            setTimeout(() => {
              fetchMerchants();
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
        <h1 className="text-xl font-semibold">Installment - Merchant Binding</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : merchantList.length > 0 ? (
        <InstallmentMerchantTable
          data={merchantList}
          onMerchantUnBind={handleMerchantUnBinding}
        />
      ) : (
        <div className="text-center py-10 text-gray-500">
            <p>No bound merchant data found.</p>
        </div>
        // <NoData message="No bound merchant data found." />
      )}
    </div>
  );
}

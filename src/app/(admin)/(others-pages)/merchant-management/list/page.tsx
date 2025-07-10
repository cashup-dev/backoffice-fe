"use client";
import React, { useEffect, useState, useCallback } from "react";
import MerchantTable, { Merchant } from "@/components/merchant-management/MerchantTable";
import NoData from "@/components/merchant-management/NoData";
import { toast } from "sonner";

export default function MerchantManagementPage() {
  const [merchantList, setMerchantList] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch("/api/merchant/list", {
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

  const handleMerchantUnBinding = useCallback((merchant: Merchant) => {
    if (!merchant?.promoId || !merchant?.merchantId) {
      toast.error("Data tidak lengkap", {
        description: "Merchant ID atau Promo ID tidak ditemukan.",
      });
      return;
    }

    const promoName = merchant.promoName || "-";
    const merchantName = merchant.merchantName || "-";

    toast("🗑️ Konfirmasi Unbind Merchant", {
      id: `confirm-unbind-${merchant.merchantId}`,
      description: `Apakah kamu yakin ingin menghapus merchant **${merchantName}** dari promo **"${promoName}"**?`,
      action: {
        label: "✅ Unbind Sekarang",
        onClick: async () => {
          const toastId = toast.loading("🚧 Sedang melakukan unbind...");

          try {
            const token = document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1];

            const res = await fetch(`/api/merchant/unbind/${merchant.promoId}`, {
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
              description: `✅ Merchant ${merchantName} berhasil dihapus dari promo.`,
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
        <h1 className="text-xl font-semibold">Merchant</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : merchantList.length > 0 ? (
        <MerchantTable
          data={merchantList}
          onMerchantUnBind={handleMerchantUnBinding}
        />
      ) : (
        <NoData message="No promo data found." />
      )}
    </div>
  );
}

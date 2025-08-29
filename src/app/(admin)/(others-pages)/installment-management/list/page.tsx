"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import InstallmentTable from "@/components/installment-management/InstallmentTable";
import Button from "@/components/ui/button/Button";

export type Installment = {
  id: number;
  name?: string;
  minTransaction?: number;
  tenorDurations?: number[];
  isActive?: boolean;
};

export default function InstallmentManagementPage() {
  const [installmentList, setInstallmentList] = useState<Installment[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const fetchInstallments = useCallback(async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch("/api/installment/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      setInstallmentList(data.data?.data || []); 
      setErrorMsg("");
    } catch (err: any) {
      console.error("❌ Failed to fetch installments", err);
      setErrorMsg(err.message || "Gagal ambil data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstallments();
  }, [fetchInstallments]);

  const handleCreate = () => {
    router.push("/installment-management/create");
  };

  const handleEdit = (installment: Installment) => {
    const encoded = encodeURIComponent(JSON.stringify(installment));
    router.push(`/installment-management/edit?data=${encoded}`);
  };

  const handleStatusChange = async (installmentId: number, isActive: boolean) => {
    await fetchInstallments(); 
  };

  // --- FUNGSI INI YANG HILANG ---
  const handleMerchantBinding = useCallback((installment: Installment) => {
    router.push(`/installment-management/merchant-bind?installmentId=${installment.id}`);
  }, [router]);

  const handleBinBinding = useCallback((installment: Installment) => {
    router.push(`/installment-management/bin-bind?installmentId=${installment.id}`);
  }, [router]);
  // --- END ---

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Installment Management</h1>
        <Button onClick={handleCreate}>➕ Add Installment</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500 text-center py-10">{errorMsg}</p>
      ) : installmentList.length > 0 ? (
        // --- PROPS INI YANG PERLU DITAMBAHKAN ---
        <InstallmentTable
          data={installmentList}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
          onMerchantBind={handleMerchantBinding}
          onBinBind={handleBinBinding}
        />
      ) : (
        <div className="text-center py-10 text-gray-500">
            <p>No installment data found.</p>
        </div>
      )}
    </div>
  );
}

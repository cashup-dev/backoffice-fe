"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EditInstallmentForm from "@/components/installment-management/EditInstallmentForm";

function EditInstallmentPageComponent() {
  const searchParams = useSearchParams();
  const [installmentData, setInstallmentData] = useState<any>(null);

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (!encoded) return;

    try {
      const decoded = decodeURIComponent(encoded);
      const parsed = JSON.parse(decoded);
      setInstallmentData(parsed);
    } catch (err) {
      console.error("❌ Failed to parse data:", err);
    }
  }, [searchParams]);

  if (!installmentData) return <p className="text-gray-500">Loading data...</p>;

  return (
    <EditInstallmentForm
      installmentData={installmentData}
      onSuccess={() => {
        // Redirect ke halaman manajemen installment setelah sukses
        window.location.href = "/installment-management";
      }}
    />
  );
}

export default function EditInstallmentPage() {
  return (
    <Suspense>
      <EditInstallmentPageComponent />
    </Suspense>
  );
}
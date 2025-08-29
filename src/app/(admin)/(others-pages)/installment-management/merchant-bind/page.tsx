"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InstallmentMerchantBindingForm from "@/components/installment-management/InstallmentMerchantBindingForm";
import { toast } from "sonner";

function BindInstallmentMerchantPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Diubah untuk mencari installmentId
  const installmentId = searchParams.get("installmentId");

  if (!installmentId) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-500">
          Installment ID tidak ditemukan
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Installment - Merchant Binding</h1>
      {/* Menggunakan komponen form yang baru untuk installment */}
      <InstallmentMerchantBindingForm
        installmentId={parseInt(installmentId)}
        onSuccess={() => {
          // Redirect ke halaman list installment
          router.push("/installment-management/list");
        }}
      />
    </div>
  );
}

export default function BindInstallmentMerchantPage() {
  return (
    <Suspense>
      <BindInstallmentMerchantPageComponent />
    </Suspense>
  );
}

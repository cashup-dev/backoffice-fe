"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InstallmentBinBindingForm from "@/components/installment-management/InstallmentBinBindingForm";

function BindInstallmentBinPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
      <h1 className="text-2xl font-bold mb-6">Installment - BIN Binding</h1>
      <InstallmentBinBindingForm
        installmentId={parseInt(installmentId)}
        onSuccess={() => {
          router.push("/installment-management/list");
        }}
      />
    </div>
  );
}

export default function BindInstallmentBinPage() {
  return (
    <Suspense>
      <BindInstallmentBinPageComponent />
    </Suspense>
  );
}

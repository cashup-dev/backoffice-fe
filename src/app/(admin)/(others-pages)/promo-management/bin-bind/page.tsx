"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BinBindingForm from "@/components/promo-management/BinBindingForm";
import { toast } from "sonner";

function BindMerchantPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promoId = searchParams.get("promoId");

  if (!promoId) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-500">
          Promo ID tidak ditemukan
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bin Binding</h1>
      <BinBindingForm
        promoId={parseInt(promoId)}
        onSuccess={() => {
          // toast.success("BIN berhasil di-bind");
          router.push("/promo-management/list");
        }}
      />
    </div>
  );
}

export default function BindMerchantPage() {
  return (
    <Suspense>
      <BindMerchantPageComponent />
    </Suspense>
  );
}

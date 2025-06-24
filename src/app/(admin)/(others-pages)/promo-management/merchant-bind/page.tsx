"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MerchantBindingForm from "@/components/promo-management/MerchantBindingForm";
import { toast } from "sonner";

function BindMerchantCompoPageComponent() {
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
      <h1 className="text-2xl font-bold mb-6">Merchant Binding</h1>
      <MerchantBindingForm
        promoId={parseInt(promoId)}
        onSuccess={() => {
          // toast.success("Merchant berhasil di-bind");
          router.push("/promo-management/list");
        }}
      />
    </div>
  );
}

export default function BindMerchantPage() {
  return (
    <Suspense>
      <BindMerchantCompoPageComponent />
    </Suspense>
  );
}

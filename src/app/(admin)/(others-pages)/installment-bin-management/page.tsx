// src/app/(admin)/(others-pages)/promo-management/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InstallmentBinRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/installment-bin-management/list");
  }, [router]);

  return null;
}

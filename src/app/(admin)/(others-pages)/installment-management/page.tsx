// src/app/(admin)/(others-pages)/promo-management/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InstallmentRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/installment-management/list");
  }, [router]);

  return null;
}

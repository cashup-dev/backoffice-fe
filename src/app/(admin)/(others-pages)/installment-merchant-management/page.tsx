"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InstallmentMerchantRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/installment-merchant-management/list");
  }, [router]);

  return null;
}

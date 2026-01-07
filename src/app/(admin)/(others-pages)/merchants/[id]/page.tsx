import type { Metadata } from "next";
import React from "react";
import MerchantDetail from "@/components/merchants/MerchantDetail";

export const metadata: Metadata = {
  title: "Merchant Details - Backoffice cashUP",
  description: "Merchant details and information",
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MerchantDetailPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="space-y-4 md:space-y-6">
      <MerchantDetail merchantId={id} />
    </div>
  );
}

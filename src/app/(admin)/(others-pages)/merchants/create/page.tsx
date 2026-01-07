import type { Metadata } from "next";
import React from "react";
import MerchantForm from "@/components/merchants/MerchantForm";

export const metadata: Metadata = {
  title: "Register New Merchant - Backoffice cashUP",
  description: "Register new merchant",
};

export default function CreateMerchantPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <MerchantForm />
    </div>
  );
}

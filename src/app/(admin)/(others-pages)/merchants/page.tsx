import type { Metadata } from "next";
import React from "react";
import MerchantsTable from "@/components/merchants/MerchantsTable";

export const metadata: Metadata = {
  title: "Merchants - Backoffice cashUP",
  description: "List of registered merchants",
};

export default function MerchantsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <MerchantsTable />
    </div>
  );
}

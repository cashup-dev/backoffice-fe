import type { Metadata } from "next";
import React from "react";
import PartnersTable from "@/components/merchants/PartnersTable";

export const metadata: Metadata = {
  title: "Partners - Backoffice cashUP",
  description: "List of registered partners",
};

export default function PartnersPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <PartnersTable />
    </div>
  );
}

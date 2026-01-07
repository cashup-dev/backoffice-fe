"use client";
import React, { useState } from "react";
import { Store, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface MerchantDetailProps {
  merchantId: string;
}

type TabType = "information" | "mdr" | "devices" | "device-users" | "mids" | "tids" | "transactions";

const MerchantDetail: React.FC<MerchantDetailProps> = ({ merchantId }) => {
  const [activeTab, setActiveTab] = useState<TabType>("information");
  const [showAddMidModal, setShowAddMidModal] = useState(false);
  const [midFormData, setMidFormData] = useState({ mid: "", batchGroup: "" });
  const [searchMid, setSearchMid] = useState("");
  const [creditDebitMids, setCreditDebitMids] = useState([
    { id: 1, batchGroup: "BNI_CREDIT", mid: "123451234512345" }
  ]);

  // Batch Group options
  const batchGroupOptions = [
    { value: "BNI_CREDIT", label: "BNI_CREDIT - BANK NEGARA INDONESIA" },
    { value: "BNI_DEBIT", label: "BNI_DEBIT - BANK NEGARA INDONESIA" },
    { value: "MTI", label: "MTI - Bank MTI" },
  ];

  // Dummy merchant data
  const merchantData = {
    name: "Decoupling Demo",
    subtitle: "test, Kota Jakarta Selatan, __postal_code__, Dki Jakarta, Indonesia",
    type: "Business Entity",
    classification: "Retail",
    idNumber: "000000000000000",
    taxNumber: "00.000.000.0-000.000",
    familyCertificate: "000000000000000",
    address: "test, Kota Jakarta Selatan, __postal_code__, Dki Jakarta, Indonesia",
    phone: "__phone__",
    registrationStatus: "Approved",
    documentCompleteness: "0%",
  };

  const tabs = [
    { id: "information" as TabType, label: "Information" },
    { id: "mdr" as TabType, label: "MDR, Limit & Features" },
    { id: "devices" as TabType, label: "Devices" },
    { id: "device-users" as TabType, label: "Device Users" },
    { id: "mids" as TabType, label: "MIDs & Batch Groups" },
    { id: "tids" as TabType, label: "TIDs & Batch Group" },
    { id: "transactions" as TabType, label: "Transactions" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Link
              href="/merchants"
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-900 dark:bg-gray-800">
                <Store className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {merchantData.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {merchantData.subtitle}
                </p>
              </div>
              <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Information Tab */}
          {activeTab === "information" && (
            <div className="space-y-8">
              {/* Merchant Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Merchant Information
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Merchant details and application.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Name
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.name}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Type
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.type}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Classification
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.classification}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      ID #
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.idNumber}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Tax #
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.taxNumber}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Family Certificate #
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.familyCertificate}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Address
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.address}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Registration
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Merchant registration status.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Type
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {merchantData.type}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Status
                    </label>
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400">
                      {merchantData.registrationStatus}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Document Completeness
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-900 dark:text-white">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {merchantData.documentCompleteness}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">KTP (WNI) / Passport (WNA)</span>
                      <span className="text-gray-500 dark:text-gray-500">-</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">NPWP Perusahaan</span>
                      <span className="text-gray-500 dark:text-gray-500">-</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">SIUP</span>
                      <span className="text-gray-500 dark:text-gray-500">-</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">TDP</span>
                      <span className="text-gray-500 dark:text-gray-500">-</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">SITU/SKDU</span>
                      <span className="text-gray-500 dark:text-gray-500">-</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Akta Perusahaan</span>
                      <span className="text-gray-500 dark:text-gray-500">-</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Foto Perusahaan</span>
                      <span className="text-gray-500 dark:text-gray-500">-</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Surat Kuasa</span>
                      <span className="text-gray-500 dark:text-gray-500">-</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outlets Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                      <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Outlets
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Available outlets for this merchant.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg dark:border-gray-800">
                    <select className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                      <option>Select an option</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Name
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-500">-</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MIDs & Batch Groups Tab */}
          {activeTab === "mids" && (
            <div className="space-y-8">
              {/* Credit Debit */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Credit Debit
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered credit debit mid for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddMidModal(true)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg dark:border-gray-800">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Batch Group</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">MID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {creditDebitMids.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{index + 1}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.batchGroup}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.mid}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                setCreditDebitMids(creditDebitMids.filter(m => m.id !== item.id));
                              }}
                              className="text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total rows per-page</span>
                    <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                      <option>25</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing 1 to {creditDebitMids.length} of {creditDebitMids.length} results
                  </div>
                </div>
              </div>

              {/* QR Dynamic Payment */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        QR Dynamic Payment
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered QR Dynamic mid for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">There is no data to show</p>
                  </div>
                </div>
              </div>

              {/* Mini ATM */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Mini ATM
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered Mini ATM mid for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg dark:border-gray-800">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Batch Group</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">MID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-800">
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">1</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">ALMINI_ATM_LATMB</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">714000100710001</td>
                        <td className="px-4 py-3">
                          <button className="text-red-600 hover:text-red-700 dark:text-red-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total rows per-page</span>
                    <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                      <option>25</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing 1 to 1 of 1 results
                  </div>
                </div>
              </div>

              {/* VA Payment */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        VA Payment
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered VA mid for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">There is no data to show</p>
                  </div>
                </div>
              </div>

              {/* BNPL */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        BNPL
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered BNPL mid for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">There is no data to show</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TIDs & Batch Group Tab */}
          {activeTab === "tids" && (
            <div className="space-y-8">
              {/* Credit Debit TID */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Credit Debit
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered credit debit TIDs for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">There is no data to show</p>
                  </div>
                </div>
              </div>

              {/* QR Dynamic TID */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        QR Dynamic
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered QR Dynamic TIDs for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">There is no data to show</p>
                  </div>
                </div>
              </div>

              {/* Mini ATM TID */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Mini ATM
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered Mini ATM TIDs for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">There is no data to show</p>
                  </div>
                </div>
              </div>

              {/* VA TID */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-950/20">
                      <svg className="w-6 h-6 text-white dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        VA
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        List of registered VA TIDs for this merchant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      +
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">There is no data to show</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Transactions
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All transactions type for this merchant
                </p>
              </div>

              {/* Transaction Type Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex overflow-x-auto gap-2">
                  {["Credit Debit", "QR Payment", "Prepaid", "Mini ATM"].map((type, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                        idx === 0
                          ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                          : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content with Sidebar and Main Area */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Sidebar - Transaction Type Filter */}
                <div className="lg:col-span-1">
                  <div className="space-y-1 border-r border-gray-200 dark:border-gray-800 pr-4">
                    {[
                      { label: "Sale", active: true },
                      { label: "Void", active: false },
                      { label: "Pending Reversal", active: false },
                      { label: "Success Reversal", active: false },
                      { label: "Settlements", active: false },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          item.active
                            ? "bg-gray-100 text-gray-900 font-medium dark:bg-gray-800 dark:text-white"
                            : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/30"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Chart */}
                  <div>
                    <ReactApexChart
                      options={{
                        chart: {
                          type: "line",
                          height: 350,
                          toolbar: { show: false },
                        },
                        stroke: {
                          curve: "straight",
                          width: 2,
                          colors: ["#3B82F6", "#10B981", "#EF4444", "#F59E0B"],
                        },
                        xaxis: {
                          categories: ["04 November", "15 September", "29 July"],
                          labels: {
                            style: {
                              colors: "#64748B",
                              fontSize: "12px",
                            },
                          },
                        },
                        yaxis: {
                          labels: {
                            style: {
                              colors: "#64748B",
                              fontSize: "12px",
                            },
                          },
                        },
                        legend: {
                          position: "bottom",
                          horizontalAlign: "center",
                          labels: {
                            colors: "#64748B",
                          },
                        },
                        grid: {
                          borderColor: "#E2E8F0",
                          strokeDashArray: 4,
                        },
                        tooltip: {
                          enabled: true,
                          theme: "light",
                        },
                      }}
                      series={[
                        { name: "Sale", data: [2, 6, 10] },
                        { name: "Pending Reversal", data: [0, 0, 0] },
                        { name: "Success Reversal", data: [0, 0, 0] },
                        { name: "Cancellation", data: [0, 0, 0] },
                      ]}
                      type="line"
                      height={350}
                    />
                  </div>

                  {/* Transactions Table */}
                  <div className="overflow-x-auto border border-gray-200 rounded-lg dark:border-gray-800">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">#</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Username</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Transaction/Batch Group</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">MID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">TID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Invoice #</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Approval Code</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">RRN</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Stan</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">PAN</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">BIN Result</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Merchant Discount Rate</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Host Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Host Time</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Midazure Date Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {[
                          { id: 1, username: "retail", batch: "BNI_CREDIT", mid: "000100015000780", tid: "91570001", invoice: "2587", approvalCode: "96627", rrn: "176521796627", stan: "052481", amount: "Rp", amountValue: "10", pan: "488990******2538", binResult: "VISA, BIN1", mdr: "2.00%", hostDate: "04 November", hostTime: "09:16:46", midDate: "2025-11-04 09:16:46" },
                          { id: 2, username: "retail", batch: "BNI_CREDIT", mid: "000100015000780", tid: "91570001", invoice: "2586", approvalCode: "89246", rrn: "176276089246", stan: "052480", amount: "Rp", amountValue: "84", pan: "488990******2538", binResult: "VISA, BIN1", mdr: "2.00%", hostDate: "04 November", hostTime: "09:08:12", midDate: "2025-11-04 09:08:12" },
                          { id: 3, username: "retail", batch: "BNI_CREDIT", mid: "000100015000780", tid: "91570001", invoice: "2585", approvalCode: "84862", rrn: "176276084862", stan: "052479", amount: "Rp", amountValue: "10", pan: "488990******2538", binResult: "VISA, BIN1", mdr: "2.00%", hostDate: "04 November", hostTime: "09:07:28", midDate: "2025-11-04 09:07:28" },
                          { id: 4, username: "demo", batch: "BNI_CREDIT", mid: "000100015000780", tid: "91570070", invoice: "10", approvalCode: "77412", rrn: "176276277412", stan: "050444", amount: "Rp", amountValue: "10,000", pan: "419737******8000", binResult: "VISA, BIN1", mdr: "2.00%", hostDate: "15 September", hostTime: "22:42:54", midDate: "2025-09-15 14:42:54" },
                          { id: 5, username: "demo", batch: "BNI_CREDIT", mid: "000100015000780", tid: "91570070", invoice: "09", approvalCode: "43201", rrn: "176276243201", stan: "050443", amount: "Rp", amountValue: "10,000", pan: "419737******8000", binResult: "VISA, BIN1", mdr: "2.00%", hostDate: "15 September", hostTime: "22:07:16", midDate: "2025-09-15 14:07:16" },
                          { id: 6, username: "demo", batch: "BNI_CREDIT", mid: "000100015000780", tid: "91570070", invoice: "08", approvalCode: "43838", rrn: "176276243838", stan: "050442", amount: "Rp", amountValue: "10,000", pan: "419737******8000", binResult: "VISA, BIN1", mdr: "2.00%", hostDate: "15 September", hostTime: "22:37:16", midDate: "2025-09-15 14:37:16" },
                        ].map((tx) => (
                          <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{tx.id}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.username}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.batch}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.mid}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.tid}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.invoice}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.approvalCode}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.rrn}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.stan}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.amount} {tx.amountValue}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.pan}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.binResult}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.mdr}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.hostDate}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.hostTime}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{tx.midDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total rows per-page</span>
                      <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Showing 1 to 24 of 24 results
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {(activeTab === "mdr" || activeTab === "devices" || activeTab === "device-users") && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tabs.find(t => t.id === activeTab)?.label}
                </p>
                <p className="text-gray-500 dark:text-gray-400">Content for this tab is coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add MID & Batch Group Modal */}
      {showAddMidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Credit Debit</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">List of registered credit debit mid for this merchant.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddMidModal(false)}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/50 dark:hover:bg-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Add MID & Batch Group Form */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add MID & Batch Group</h3>
                </div>

                {/* Validation Rules */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-700 flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-3">Validation Rules:</p>
                      <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                          <span>Satu MID tidak boleh memiliki Batch Group yang duplikat</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                          <span>Satu Batch Group hanya boleh memiliki satu MID yang sama</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                          <span>Satu MID boleh memiliki multiple Batch Group, tapi harus dari acquirer yang sama</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      MID (Merchant ID) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter MID"
                      value={midFormData.mid}
                      onChange={(e) => setMidFormData({ ...midFormData, mid: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Batch Group <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={midFormData.batchGroup}
                      onChange={(e) => setMidFormData({ ...midFormData, batchGroup: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    >
                      <option value="">Select Batch Group</option>
                      {batchGroupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setMidFormData({ mid: "", batchGroup: "" })}
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      if (midFormData.mid && midFormData.batchGroup) {
                        setCreditDebitMids([
                          ...creditDebitMids,
                          {
                            id: creditDebitMids.length + 1,
                            mid: midFormData.mid,
                            batchGroup: midFormData.batchGroup,
                          },
                        ]);
                        setMidFormData({ mid: "", batchGroup: "" });
                      }
                    }}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/50"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by Batch Group or MID..."
                  value={searchMid}
                  onChange={(e) => setSearchMid(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>

              {/* Table */}
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Batch Group</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">MID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                      {creditDebitMids
                        .filter((item) =>
                          searchMid
                            ? item.batchGroup.toLowerCase().includes(searchMid.toLowerCase()) ||
                              item.mid.toLowerCase().includes(searchMid.toLowerCase())
                            : true
                        )
                        .map((item, index) => (
                          <tr key={item.id} className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">{index + 1}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                {item.batchGroup}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{item.mid}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => {
                                  setCreditDebitMids(creditDebitMids.filter((m) => m.id !== item.id));
                                }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white rounded-lg transition-all"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="hidden sm:inline">Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total rows per-page</span>
                  <select className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all">
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <span>Showing</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded font-bold">1</span>
                  <span>to</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded font-bold">{creditDebitMids.length}</span>
                  <span>of</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded font-bold">{creditDebitMids.length}</span>
                  <span>results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantDetail;

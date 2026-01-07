"use client";
import React, { useState } from "react";
import { Store } from "lucide-react";
import {
  InformationCircleIcon,
  DocumentTextIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  ScaleIcon
} from "@heroicons/react/24/outline";

type TabType = "information" | "documents" | "features" | "mdr";

const MerchantForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("information");
  const [usedForTesting, setUsedForTesting] = useState(false);

  // Merchant Type & Documents state
  const [merchantType, setMerchantType] = useState({
    perusahaan: true,
    perorangan: false,
    suratKuasa: false,
  });

  const [documentsPerusahaan, setDocumentsPerusahaan] = useState({
    ktpPassport: false,
    npwpPerusahaan: false,
    siup: false,
    tdp: false,
    situSkdu: false,
    aktaPerusahaan: false,
    fotoTempat: false,
  });

  const [documentsPerorangan, setDocumentsPerorangan] = useState({
    ktpPassport: false,
    npwpPemilik: false,
    situSkuSurat: false,
    fotoTempat: false,
  });

  // Payment Features state
  const [paymentFeatures, setPaymentFeatures] = useState({
    creditDebit: false,
    qrPayment: false,
    bnplPayment: false,
    pos: false,
  });

  const tabs = [
    { id: "information" as TabType, label: "Information", icon: <InformationCircleIcon className="w-4 h-4" /> },
    { id: "documents" as TabType, label: "Merchant Type & Documents", icon: <DocumentTextIcon className="w-4 h-4" /> },
    { id: "features" as TabType, label: "Features", icon: <SparklesIcon className="w-4 h-4" /> },
    { id: "mdr" as TabType, label: "MDR, Admin Fee, Transaction Limit & Batch Group", icon: <CurrencyDollarIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800">
              <Store className="w-7 h-7 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Merchant
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Register new merchant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-300 dark:hover:bg-gray-800">
              Cancel
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Information Tab */}
        {activeTab === "information" && (
          <div className="space-y-8">
            {/* Merchant Information Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <InformationCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Merchant Information
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Information about this merchant like group, classification, category, etc.
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usedForTesting}
                    onChange={(e) => setUsedForTesting(e.target.checked)}
                    className="w-10 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition-colors checked:bg-blue-600 relative
                      after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform
                      checked:after:translate-x-5"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Used for testing
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Classification <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Select an option</option>
                    <option>Retail</option>
                    <option>F&B</option>
                    <option>Services</option>
                    <option>Healthcare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Select an option</option>
                    <option>Electronics Stores</option>
                    <option>Grocery Stores and Supermarkets</option>
                    <option>Restaurants and Food Services</option>
                    <option>Drug Stores and Pharmacies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Partner
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Select an option</option>
                    <option>Partner A</option>
                    <option>Partner B</option>
                    <option>Partner C</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <MapPinIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Address
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The place or the name of the place where this merchant is located.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Indonesia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>DKI Jakarta</option>
                    <option>Jawa Barat</option>
                    <option>Jawa Tengah</option>
                    <option>Jawa Timur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Kota Jakarta Selatan</option>
                    <option>Kota Jakarta Pusat</option>
                    <option>Kota Jakarta Utara</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Kebayoran Lama</option>
                    <option>Kebayoran Baru</option>
                    <option>Cilandak</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Village <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Pondok Pinang</option>
                    <option>Cipete Selatan</option>
                    <option>Gandaria Selatan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Street
                  </label>
                  <textarea
                    rows={3}
                    placeholder="test"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Person In-Charge Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <UserCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Person In-Charge
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Person who is responsible of this merchant.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Office Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mobile Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="@yahoo.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Company Legality Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <ScaleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Company Legality
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The legal status of a company which must be valid according to applicable laws and regulations.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name of Legal Entity of Business Owner <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type of Business <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ID Card # <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax # <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Family Certificate # <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Duration
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={0}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      Years
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <BuildingLibraryIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Bank
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bank <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Select an option</option>
                    <option>Bank BCA</option>
                    <option>Bank Mandiri</option>
                    <option>Bank BNI</option>
                    <option>Bank BRI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Clearing Code <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                    <option>Select an option</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Branch
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account # <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Merchant Type & Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <DocumentTextIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Merchant and Documents
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Merchant type and required documents.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Perusahaan Column */}
                <div>
                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={merchantType.perusahaan}
                      onChange={(e) => setMerchantType({ ...merchantType, perusahaan: e.target.checked })}
                      className="w-10 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition-colors checked:bg-blue-600 relative
                        after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform
                        checked:after:translate-x-5"
                    />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Perusahaan
                    </span>
                  </label>

                  <div className="space-y-3">
                    {[
                      { key: 'ktpPassport', label: 'Fotokopi KTP (WNI) / Passport (WNA)' },
                      { key: 'npwpPerusahaan', label: 'Fotokopi NPWP Perusahaan' },
                      { key: 'siup', label: 'Fotokopi SIUP' },
                      { key: 'tdp', label: 'Fotokopi TDP' },
                      { key: 'situSkdu', label: 'Fotokopi SITU/SKDU' },
                      { key: 'aktaPerusahaan', label: 'Fotokopi Akta Perusahaan' },
                      { key: 'fotoTempat', label: 'Foto Tempat Usaha' },
                    ].map((doc) => (
                      <label key={doc.key} className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={documentsPerusahaan[doc.key as keyof typeof documentsPerusahaan]}
                          onChange={(e) => setDocumentsPerusahaan({ ...documentsPerusahaan, [doc.key]: e.target.checked })}
                          className="mt-0.5 w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {doc.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Perorangan Column */}
                <div>
                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={merchantType.perorangan}
                      onChange={(e) => setMerchantType({ ...merchantType, perorangan: e.target.checked })}
                      className="w-10 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition-colors checked:bg-blue-600 relative
                        after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform
                        checked:after:translate-x-5"
                    />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Perorangan
                    </span>
                  </label>

                  <div className="space-y-3">
                    {[
                      { key: 'ktpPassport', label: 'Fotokopi KTP (WN) / Passport (WNA)' },
                      { key: 'npwpPemilik', label: 'Fotokopi NPWP Pemilik (jika ada)' },
                      { key: 'situSkuSurat', label: 'Fotokopi SITU/SKU/Surat Sewa/PBB (jika ada)' },
                      { key: 'fotoTempat', label: 'Foto Tempat Usaha' },
                    ].map((doc) => (
                      <label key={doc.key} className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={documentsPerorangan[doc.key as keyof typeof documentsPerorangan]}
                          onChange={(e) => setDocumentsPerorangan({ ...documentsPerorangan, [doc.key]: e.target.checked })}
                          className="mt-0.5 w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {doc.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Surat Kuasa Column */}
                <div>
                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={merchantType.suratKuasa}
                      onChange={(e) => setMerchantType({ ...merchantType, suratKuasa: e.target.checked })}
                      className="w-10 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition-colors checked:bg-blue-600 relative
                        after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform
                        checked:after:translate-x-5"
                    />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Surat Kuasa (jika ada)
                    </span>
                  </label>

                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    Khusus untuk merchant badan usaha dan penanda tangan formulir pendaftaran merchant adalah bukan nama yang tercantumdalam akta
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <SparklesIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Payment Features
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Currently available payments. Select one or more that suits your need.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg dark:border-gray-800">
                  <input
                    type="checkbox"
                    checked={paymentFeatures.creditDebit}
                    onChange={(e) => setPaymentFeatures({ ...paymentFeatures, creditDebit: e.target.checked })}
                    className="mt-1 w-10 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition-colors checked:bg-blue-600 relative
                      after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform
                      checked:after:translate-x-5"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Credit Debit Card Present
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select to activate the credit/debit payment feature.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg dark:border-gray-800">
                  <input
                    type="checkbox"
                    checked={paymentFeatures.qrPayment}
                    onChange={(e) => setPaymentFeatures({ ...paymentFeatures, qrPayment: e.target.checked })}
                    className="mt-1 w-10 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition-colors checked:bg-blue-600 relative
                      after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform
                      checked:after:translate-x-5"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      QR Payment
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select to activate the QR payment feature.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg dark:border-gray-800">
                  <input
                    type="checkbox"
                    checked={paymentFeatures.bnplPayment}
                    onChange={(e) => setPaymentFeatures({ ...paymentFeatures, bnplPayment: e.target.checked })}
                    className="mt-1 w-10 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition-colors checked:bg-blue-600 relative
                      after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform
                      checked:after:translate-x-5"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      BNPL Payment
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select to activate the BNPL payment feature.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg dark:border-gray-800">
                  <input
                    type="checkbox"
                    checked={paymentFeatures.pos}
                    onChange={(e) => setPaymentFeatures({ ...paymentFeatures, pos: e.target.checked })}
                    className="mt-1 w-10 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition-colors checked:bg-blue-600 relative
                      after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform
                      checked:after:translate-x-5"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      POS
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select to activate the POS feature.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MDR Tab */}
        {activeTab === "mdr" && (
          <div className="space-y-8">
            {/* Credit Debit Merchant MDR */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                    <CurrencyDollarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Credit Debit Merchant MDR
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      A fee charged to a business by the company that processes its debit and credit card transactions. <span className="font-semibold">Merchant MDR = Acquirer MDR + Aggregator MDR + Agent MDR + Dealer MDR + Sales MDR + Cashlez Revenue</span>
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2">
                  <span className="text-lg">+</span>
                  Add MDR & Fee
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-lg dark:border-gray-800">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">#</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Acquirer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Card Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">On/Off Us</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Card Principal</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Acquirer MDR</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Aggregator MDR</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Agent MDR</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Dealer MDR</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Sales MDR</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Cashlez Revenue</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Merchant MDR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-800">
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">1</td>
                      <td className="px-4 py-3">
                        <select className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                          <option>Bank MTI</option>
                          <option>Bank BCA</option>
                          <option>Bank Mandiri</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                          <option>DEBIT</option>
                          <option>CREDIT</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                          <option>OFF US</option>
                          <option>ON US</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select className="w-40 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                          <option>All Card Principals</option>
                          <option>VISA</option>
                          <option>Mastercard</option>
                          <option>AMEX</option>
                          <option>JCB</option>
                          <option>CUP</option>
                          <option>GPN</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <input type="number" defaultValue={0} className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <input type="number" defaultValue={0} className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <input type="number" defaultValue={0} className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <input type="number" defaultValue={0} className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <input type="number" defaultValue={0} className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <input type="number" defaultValue={0} className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                        0.00%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transaction Limits */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <CurrencyDollarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Transaction Limits
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Limit on the amount of payment in each transaction.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Rp</span>
                    <input
                      type="text"
                      defaultValue="0.0"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Amount with CVM
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Rp</span>
                    <input
                      type="text"
                      defaultValue="0.0"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Amount without CVM
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Rp</span>
                    <input
                      type="text"
                      defaultValue="0.0"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantForm;

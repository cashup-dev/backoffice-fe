"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Store } from "lucide-react";

interface Merchant {
  id: number;
  name: string;
  partner: string;
  category: string;
  classification: string;
  approvalStatus: "Approved" | "Pending" | "Rejected";
  createdDate: string;
}

const MerchantsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Dummy data merchants
  const dummyMerchants: Merchant[] = [
    {
      id: 1,
      name: "Decoupling Demo",
      partner: "-",
      category: "Miscellaneous and Specialty Retail Stores",
      classification: "Retail",
      approvalStatus: "Approved",
      createdDate: "2025-01-01",
    },
    {
      id: 2,
      name: "Decoupling Simulator",
      partner: "-",
      category: "Miscellaneous and Specialty Retail Stores",
      classification: "Retail",
      approvalStatus: "Approved",
      createdDate: "2025-01-02",
    },
    {
      id: 3,
      name: "Toko Elektronik Jaya",
      partner: "Partner A",
      category: "Electronics Stores",
      classification: "Retail",
      approvalStatus: "Approved",
      createdDate: "2025-01-03",
    },
    {
      id: 4,
      name: "Warung Makan Sederhana",
      partner: "Partner B",
      category: "Restaurants and Food Services",
      classification: "F&B",
      approvalStatus: "Pending",
      createdDate: "2025-01-04",
    },
    {
      id: 5,
      name: "Apotek Sehat Sentosa",
      partner: "-",
      category: "Drug Stores and Pharmacies",
      classification: "Healthcare",
      approvalStatus: "Approved",
      createdDate: "2025-01-05",
    },
    {
      id: 6,
      name: "Minimarket 24 Jam",
      partner: "Partner C",
      category: "Grocery Stores and Supermarkets",
      classification: "Retail",
      approvalStatus: "Approved",
      createdDate: "2025-01-06",
    },
    {
      id: 7,
      name: "Bengkel Motor Jaya",
      partner: "-",
      category: "Automotive Services",
      classification: "Services",
      approvalStatus: "Rejected",
      createdDate: "2025-01-07",
    },
    {
      id: 8,
      name: "Salon Kecantikan Anggun",
      partner: "Partner D",
      category: "Beauty and Personal Care Services",
      classification: "Services",
      approvalStatus: "Approved",
      createdDate: "2025-01-08",
    },
    {
      id: 9,
      name: "Toko Buku Cerdas",
      partner: "-",
      category: "Book Stores",
      classification: "Retail",
      approvalStatus: "Pending",
      createdDate: "2025-01-09",
    },
    {
      id: 10,
      name: "Gym Fitness Center",
      partner: "Partner E",
      category: "Health and Fitness Services",
      classification: "Services",
      approvalStatus: "Approved",
      createdDate: "2025-01-10",
    },
  ];

  // Filter merchants based on search
  const filteredMerchants = dummyMerchants.filter((merchant) =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMerchants = filteredMerchants.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800">
            <Store className="w-7 h-7 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Merchants
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              List of registered merchants
            </p>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="border-b border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/merchants/create"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </Link>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
              <ArrowUpTrayIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
              <ArrowDownTrayIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
              <FunnelIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
              <ArrowPathIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
              <Cog6ToothIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Partner
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Classification
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Approval Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Is Merchant Testing
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {currentMerchants.map((merchant, index) => (
              <tr
                key={merchant.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {merchant.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {merchant.partner}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {merchant.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {merchant.classification}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      merchant.approvalStatus
                    )}`}
                  >
                    {merchant.approvalStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(merchant.createdDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    No
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/merchants/${merchant.id}`}
                      className="flex items-center justify-center w-9 h-9 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-950/20"
                      title="View"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/merchants/${merchant.id}/edit`}
                      className="flex items-center justify-center w-9 h-9 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-yellow-950/20"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>
                    <button
                      className="flex items-center justify-center w-9 h-9 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-950/20"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="flex items-center justify-center w-9 h-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                      title="Lock"
                    >
                      <LockClosedIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="flex items-center justify-center w-9 h-9 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-950/20"
                      title="Download"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total rows per-page
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredMerchants.length)} of{" "}
            {filteredMerchants.length} results
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantsTable;

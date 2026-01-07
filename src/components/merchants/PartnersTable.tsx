"use client";
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Users } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalMerchants: number;
  status: "Active" | "Inactive";
  joinedDate: string;
}

const PartnersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Dummy data partners
  const dummyPartners: Partner[] = [
    {
      id: 1,
      name: "Partner A",
      email: "partnera@example.com",
      phone: "+62 812-3456-7890",
      totalMerchants: 15,
      status: "Active",
      joinedDate: "2024-06-15",
    },
    {
      id: 2,
      name: "Partner B",
      email: "partnerb@example.com",
      phone: "+62 813-4567-8901",
      totalMerchants: 8,
      status: "Active",
      joinedDate: "2024-07-20",
    },
    {
      id: 3,
      name: "Partner C",
      email: "partnerc@example.com",
      phone: "+62 814-5678-9012",
      totalMerchants: 23,
      status: "Active",
      joinedDate: "2024-05-10",
    },
    {
      id: 4,
      name: "Partner D",
      email: "partnerd@example.com",
      phone: "+62 815-6789-0123",
      totalMerchants: 5,
      status: "Inactive",
      joinedDate: "2024-08-05",
    },
    {
      id: 5,
      name: "Partner E",
      email: "partnere@example.com",
      phone: "+62 816-7890-1234",
      totalMerchants: 12,
      status: "Active",
      joinedDate: "2024-09-12",
    },
  ];

  // Filter partners based on search
  const filteredPartners = dummyPartners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400";
      case "Inactive":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
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
            <Users className="w-7 h-7 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Partners
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              List of registered partners
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
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              <PlusIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
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
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Total Merchants
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Joined Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {currentPartners.map((partner, index) => (
              <tr
                key={partner.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {partner.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {partner.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {partner.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {partner.totalMerchants}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      partner.status
                    )}`}
                  >
                    {partner.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(partner.joinedDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
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
            {Math.min(indexOfLastItem, filteredPartners.length)} of{" "}
            {filteredPartners.length} results
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersTable;

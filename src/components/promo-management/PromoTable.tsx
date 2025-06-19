"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


type Promo = {
  id: number;
  name?: string;
  promoType?: string;
  promoValue?: number;
  minTransaction?: number;
  maxTransaction?: number;
  maxSubsidy?: number;
  channelType?: string;
  validFrom?: string;
  validTo?: string;
  isActive?: boolean;
};

type Props = {
  data: Promo[];
  onEdit?: (promo: Promo) => Promise<void> | void;
  onMerchantBind?: (promo: Promo) => Promise<void> | void;
  onBinBind?: (promo: Promo) => Promise<void> | void;
  onStatusChange?: (promoId: number, isActive: boolean) => Promise<void>;
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); 
}

export default function PromoTable({
  data,
  onEdit,
  onMerchantBind,
  onBinBind,
  onStatusChange,
}: Props) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<number | null>(null);
  const [loadingAction, setLoadingAction] = useState<{
    id: number | null;
    action: string | null;
  }>({ id: null, action: null });
  const router = useRouter();

  const toggleDropdown = (id: number) => {
    if (!loadingAction.id) { // Hanya boleh toggle kalo gak ada yang loading
      setOpenDropdownId((prev) => (prev === id ? null : id));
    }
  };

  const simulateLoading = () => {
    return new Promise(resolve => setTimeout(resolve, 800)); // Simulasi loading 0.8 detik
  };

  const handleMerchantBind = async (promo: Promo) => {
    setLoadingAction({ id: promo.id, action: 'merchant' });
    try {
      await simulateLoading(); // Tambah delay biar loading keliatan
      
      if (onMerchantBind) {
        await onMerchantBind(promo);
      } else {
        router.push(`/promo-management/merchant-bind?promoId=${promo.id}`);
      }
    } finally {
      setLoadingAction({ id: null, action: null });
    }
  };

  const handleBinBind = async (promo: Promo) => {
    setLoadingAction({ id: promo.id, action: 'bin' });
    try {
      await simulateLoading(); // Tambah delay biar loading keliatan
      
      if (onBinBind) {
        await onBinBind(promo);
      } else {
        router.push(`/promo-management/bin-bind?promoId=${promo.id}`);
      }
    } finally {
      setLoadingAction({ id: null, action: null });
    }
  };

  const handleEdit = async (promo: Promo) => {
    setLoadingAction({ id: promo.id, action: 'edit' });
    try {
      await simulateLoading(); // Tambah delay biar loading keliatan
      
      if (onEdit) {
        await onEdit(promo);
      }
    } finally {
      setLoadingAction({ id: null, action: null });
    }
  };

  const handleStatusChange = async (promoId: number, isActive: boolean) => {
    setLoadingStatus(promoId);
    try {
      const res = await fetch(`/api/promo/activate/${promoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal update status");
      }
  
      if (onStatusChange) {
        await onStatusChange(promoId, isActive);
      }
  
      toast.success(`Status promo berhasil diubah ke ${isActive ? "active" : "inactive"}`);
    } catch (err: any) {
      console.error("🔥 Full error:", err);
      toast.error(`Gagal update status: ${err.message}`);
    } finally {
      setLoadingStatus(null);
    }
  };
  
  return (
    <div className="overflow-auto border rounded-xl shadow-sm">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Value</th>
            <th className="px-4 py-3">Min Tx</th>
            <th className="px-4 py-3">Max Tx</th>
            <th className="px-4 py-3">Max Subsidy</th>
            <th className="px-4 py-3">Channel</th>
            <th className="px-4 py-3">Valid From</th>
            <th className="px-4 py-3">Valid To</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((promo) => {
              const {
                id,
                name = "-",
                promoType = "-",
                promoValue = 0,
                minTransaction = 0,
                maxTransaction = 0,
                maxSubsidy = 0,
                channelType = "-",
                validFrom,
                validTo,
                isActive = false,
              } = promo;

              const formattedValue =
                promoType === "PERCENTAGE"
                  ? `${promoValue}%`
                  : `Rp${promoValue.toLocaleString("id-ID")}`;

              const isOpen = openDropdownId === id;
              const isLoadingStatus = loadingStatus === id;
              const isLoadingAction = loadingAction.id === id;
              const currentAction = loadingAction.action;

              return (
                <tr key={id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3">{promoType}</td>
                  <td className="px-4 py-3">{formattedValue}</td>
                  <td className="px-4 py-3">
                    Rp{minTransaction.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    Rp{maxTransaction.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    Rp{maxSubsidy.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{channelType}</td>
                  <td className="px-4 py-3">{formatDate(validFrom)}</td>
                  <td className="px-4 py-3">{formatDate(validTo)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center relative">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="text-blue-600 hover:underline flex items-center gap-1 min-w-[60px] justify-center"
                        disabled={isLoadingAction}
                      >
                        {isLoadingAction && currentAction === 'edit' ? (
                          <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        ) : 'Edit'}
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(id)}
                          className="flex items-center gap-1 text-gray-600 hover:text-black"
                          disabled={isLoadingAction}
                        >
                          More <ChevronDownIcon className="w-4 h-4" />
                        </button>
                        {isOpen && (
                          <div className="absolute right-0 mt-2 z-10 bg-white shadow-md border rounded-md text-sm w-48">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleMerchantBind(promo);
                                setOpenDropdownId(null);
                              }}
                              disabled={isLoadingAction}
                            >
                              {isLoadingAction && currentAction === 'merchant' ? (
                                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                              ) : null}
                              Merchant Binding
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleBinBind(promo);
                                setOpenDropdownId(null);
                              }}
                              disabled={isLoadingAction}
                            >
                              {isLoadingAction && currentAction === 'bin' ? (
                                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                              ) : null}
                              BIN Binding
                            </button>
                            <button
                              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 ${
                                isActive ? 'text-red-500' : 'text-green-500'
                              }`}
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await handleStatusChange(id, !isActive);
                                setOpenDropdownId(null);
                              }}
                              disabled={isLoadingStatus}
                            >
                              {isLoadingStatus ? (
                                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                              ) : null}
                              {isActive ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11} className="text-center text-gray-400 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
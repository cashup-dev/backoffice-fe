"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";

export type Bin = {
    id: number;
    binIds?: number;
    binNumber?: number;
    promoId?: number;
    promoName?: string;
    createdAt?: string;
  };

type Props = {
  data: Bin[];
  onBinUnBinding?: (bin: Bin) => void;
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

export default function BinTable({ data, onBinUnBinding }: Props) {
  const {isAdmin} = useAuth();

  return (
    <div className="overflow-auto border rounded-xl shadow-sm">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">BIN</th>
            <th className="px-4 py-3">Promo Name</th>
            <th className="px-4 py-3">Created At</th>
            {isAdmin && (
              <th className="px-4 py-3 text-center">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((bin) => {
              const {
                id,
                binNumber = "-",
                promoName = "-",
                createdAt,
              } = bin;

              return (
                <tr key={id} className="border-t">
                  <td className="px-4 py-3">{binNumber}</td>
                  <td className="px-4 py-3">{promoName}</td>
                  <td className="px-4 py-3">{formatDate(createdAt)}</td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-center">
                    <button
                      className="text-sm font-medium text-red-600 hover:text-red-800 px-4 py-2 border border-red-500 rounded-md"
                      onClick={() => onBinUnBinding?.(bin)}
                    >
                      Unbind BIN
                    </button>
                  </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-400 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import React from "react";

export default function UsageHistoryTable({ data }: { data: any[] }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Nomor Kartu</th>
            <th className="px-4 py-2">Nama Promo</th>
            <th className="px-4 py-2">Merchant</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Subsidi</th>
            <th className="px-4 py-2">Final Amount</th>
            <th className="px-4 py-2">Waktu Transaksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center text-gray-500 py-4">
                Tidak ada data yang ditemukan
              </td>
            </tr>
          ) : (
            data.map((item: any, index: number) => (
              <tr key={`${item.cardNumber}-${item.usedAt}`} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.cardNumber}</td>
                <td className="px-4 py-2">{item.promoName}</td>
                <td className="px-4 py-2">{item.merchantName}</td>
                <td className="px-4 py-2">{item.statusTransaction}</td>
                <td className="px-4 py-2">{formatCurrency(item.amount)}</td>
                <td className="px-4 py-2">{formatCurrency(item.subsidyApplied)}</td>
                <td className="px-4 py-2 font-medium">{formatCurrency(item.finalAmount)}</td>
                <td className="px-4 py-2">{item.usedAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
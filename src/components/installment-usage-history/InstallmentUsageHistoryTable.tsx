"use client";
import React from "react";

export default function InstallmentUsageHistoryTable({ data }: { data: any[] }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Nomor Kartu</th>
            <th className="px-4 py-2">Nama Installment</th>
            <th className="px-4 py-2">Merchant</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Durasi Cicilan</th>
            <th className="px-4 py-2">Waktu Transaksi</th>
            <th className="px-4 py-2">Transaction ID</th>
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
              <tr key={`${item.promoTransactionId}-${index}`} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.cardNumber}</td>
                <td className="px-4 py-2">{item.installmentName}</td>
                <td className="px-4 py-2">{item.merchantName}</td>
                <td className="px-4 py-2">{item.statusTransaction}</td>
                <td className="px-4 py-2">{formatCurrency(item.amount)}</td>
                <td className="px-4 py-2">{item.installmentDuration} Bulan</td>
                <td className="px-4 py-2">{formatDate(item.usedAt)}</td>
                <td className="px-4 py-2">{item.promoTransactionId}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

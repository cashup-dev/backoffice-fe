"use client";
import React from "react";

export default function EligibilityTable({ data }: { data: any[] }) {
  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Batch ID</th>
            <th className="px-4 py-2">Card Type</th>
            <th className="px-4 py-2">Last 4</th>
            <th className="px-4 py-2">Holder Prefix</th>
            <th className="px-4 py-2">Expiry</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item: any) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.batchId}</td>
                <td className="px-4 py-2">{item.cardType}</td>
                <td className="px-4 py-2">{item.cardNumberLast4}</td>
                <td className="px-4 py-2">{item.cardHoldernamePrefix}</td>
                <td className="px-4 py-2">{item.cardExpiry}</td>
                <td className="px-4 py-2">
                  {item.eligibilityStatus ? "✅" : "❌"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

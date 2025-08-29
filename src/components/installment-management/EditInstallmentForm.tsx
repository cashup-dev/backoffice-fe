"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
// import Input from "@/components/form/input/InputField"; 
import { toast } from "sonner";

type Tenor = {
  id: number;
  durationMonths: number;
};

type EditInstallmentFormProps = {
  installmentData: {
    id: number;
    name: string;
    minTransaction: number;
    tenorDurations: number[]; 
  };
  onSuccess?: () => void;
};

export default function EditInstallmentForm({ installmentData, onSuccess }: EditInstallmentFormProps) {
  const [name, setName] = useState("");
  const [minTransaction, setMinTransaction] = useState(0);
  const [selectedTenorDurations, setSelectedTenorDurations] = useState<number[]>([]);
  
  const [availableTenors, setAvailableTenors] = useState<Tenor[]>([]);
  const [tenorsLoading, setTenorsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTenors = async () => {
      // ... (logika fetch tenor tetap sama)
      setTenorsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      try {
        const res = await fetch("/api/tenor/list", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Gagal memuat tenor");
        setAvailableTenors(data.data);
      } catch (err) {
        console.error("Fetch Tenors Error:", err);
        toast.error("Gagal memuat daftar tenor.");
      } finally {
        setTenorsLoading(false);
      }
    };
    fetchTenors();
  }, []);

  useEffect(() => {
    if (installmentData) {
      setName(installmentData.name || "");
      setMinTransaction(installmentData.minTransaction || 0);
      setSelectedTenorDurations(installmentData.tenorDurations || []);
    }
  }, [installmentData]);

  const handleTenorChange = (duration: number, isChecked: boolean) => {
    setSelectedTenorDurations(prev => 
      isChecked ? [...prev, duration] : prev.filter(d => d !== duration)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("❌ Nama installment wajib diisi.");
      return;
    }
    if (selectedTenorDurations.length === 0) {
      toast.error("❌ Minimal satu tenor harus dipilih.");
      return;
    }
    setIsSubmitting(true);
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    try {
      // DIPERBAIKI: URL disesuaikan dengan path file API route Anda
      const res = await fetch(`/api/installment/edit/${installmentData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          name: name,
          minTransaction: minTransaction,
          tenorIdDurations: selectedTenorDurations,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal update installment");
      toast.success("✅ Installment berhasil diubah!");
      onSuccess?.();
    } catch (err: any) {
      toast.error("❌ Gagal update installment", {
        description: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ComponentCard title={`Edit Installment`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Installment Name</Label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter installment name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label>Min Transaction</Label>
          <input
            type="number"
            value={minTransaction}
            onChange={(e) => setMinTransaction(parseFloat(e.target.value) || 0)}
            className="w-full border px-3 py-2 rounded"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label>Tenor</Label>
          {tenorsLoading ? <p className="text-gray-500">Loading tenors...</p> : (
            <div className="flex flex-wrap gap-4 mt-2">
              {availableTenors.map((tenor) => (
                <div key={tenor.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`tenor-${tenor.id}`}
                    checked={selectedTenorDurations.includes(tenor.durationMonths)}
                    onChange={(e) => handleTenorChange(tenor.durationMonths, e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  <label htmlFor={`tenor-${tenor.id}`} className="text-sm font-medium text-gray-700">
                    {tenor.durationMonths} Months
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Button type="submit" className="w-full" disabled={isSubmitting || tenorsLoading}>
            {isSubmitting ? "Updating..." : "Update Installment"}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { toast } from "sonner";
import DatePicker from "@/components/form/date-picker";

type EditPromoFormProps = {
  promoData: {
    id: number;
    promoValue: number;
    maxSubsidy: number;
    finalPromoAmount: number;
    usagePerDay: number;
    validTo: string;
    promoType: string;
  };
  onSuccess?: () => void;
};

export default function EditPromoForm({ promoData, onSuccess }: EditPromoFormProps) {
  const [promoValue, setPromoValue] = useState(0);
  const [maxSubsidy, setMaxSubsidy] = useState(0);
  const [finalPromoAmount, setFinalPromoAmount] = useState(0);
  const [usagePerDay, setUsagePerDay] = useState(0);
  const [validTo, setValidTo] = useState("");
  const [promoType, setPromoType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (promoData) {
      setPromoValue(promoData.promoValue || 0);
      setMaxSubsidy(promoData.maxSubsidy || 0);
      setFinalPromoAmount(promoData.finalPromoAmount || 0);
      setUsagePerDay(promoData.usagePerDay || 0);
      setValidTo(promoData.validTo || "");
      setPromoType(promoData.promoType || "");
    }
  }, [promoData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Client-side validation
    if (!promoValue && promoValue !== 0) {
      toast.error("❌ Nilai Promo wajib diisi");
      return;
    }
  
    if (!maxSubsidy && maxSubsidy !== 0) {
      toast.error("❌ Subsidi Maksimal wajib diisi");
      return;
    }
  
    if (!usagePerDay && usagePerDay !== 0) {
      toast.error("❌ Penggunaan per hari wajib diisi");
      return;
    }
  
    if (!finalPromoAmount && finalPromoAmount !== 0) {
      toast.error("❌ Nilai Promo Akhir wajib diisi");
      return;
    }
  
    if (!validTo) {
      toast.error("❌ Tanggal Berlaku wajib diisi");
      return;
    }
  
    if (
      promoValue === promoData.promoValue &&
      maxSubsidy === promoData.maxSubsidy &&
      usagePerDay === promoData.usagePerDay &&
      finalPromoAmount === promoData.finalPromoAmount &&
      validTo === promoData.validTo
    ) {
      toast.warning("⚠️ Tidak ada perubahan data untuk disimpan.");
      return;
    }
  
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/promo/edit/${promoData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          promoValue,
          maxSubsidy,
          finalPromoAmount,
          usagePerDay,
          validTo,
        }),
      });
  
      const data = await res.json();
      // console.log("Response dari server:", data); // Juga bisa log response dari server
  
      if (!res.ok) throw new Error(data.message || "Failed to update");
  
      toast.success("✅ Promo berhasil diubah!", {
        description: "Data berhasil disimpan.",
      });
  
      onSuccess?.();
    } catch (err: any) {
      console.error("Error saat update promo:", err); // Log error jika terjadi
      toast.error("❌ Gagal update promo", {
        description: err.message || "Terjadi kesalahan server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <ComponentCard title="Edit Promo">
      <form onSubmit={handleSubmit} className="space-y-6">
        {(promoType !== 'FIXED') && // TODO: this might be a temporary solution, need to adjust the edit form field to be more dynamic on future
          <div>
            <Label>Promo Value</Label>
            <input
              type="number"
              value={promoValue}
              onChange={(e) => setPromoValue(parseFloat(e.target.value))}
              className="w-full border px-3 py-2 rounded"
              disabled={isSubmitting}
            />
          </div>
        }

        <div>
          <Label>Max Subsidy</Label>
          <input
            type="number"
            value={maxSubsidy}
            onChange={(e) => setMaxSubsidy(parseFloat(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label>Final Promo Amount</Label>
          <input
            type="number"
            value={finalPromoAmount}
            onChange={(e) => setFinalPromoAmount(parseFloat(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label>Usage Per Day</Label>
          <input
            type="number"
            value={usagePerDay}
            onChange={(e) => setUsagePerDay(parseFloat(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            disabled={isSubmitting}
          />
        </div>

        <div>
        <DatePicker
          id="validToPicker"
          label="Valid To"
          defaultDate={validTo ? new Date(validTo) : undefined}
          onChange={(selectedDates) => {
            const selected = selectedDates[0];
            if (selected instanceof Date && !isNaN(selected.getTime())) {
              const formatted = selected.toISOString().split("T")[0]; // Format YYYY-MM-DD
              setValidTo(formatted);
            }
          }}
          minDate="today"
        />
        </div>


        <div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </div>
            ) : (
              "Update Promo"
            )}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}

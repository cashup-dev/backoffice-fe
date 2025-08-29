"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { toast } from "sonner";

// Definisi tipe untuk data tenor
type Tenor = {
  id: number;
  durationMonths: number;
};

export default function CreateInstallmentManagementForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tenors, setTenors] = useState<Tenor[]>([]);
  const [tenorsLoading, setTenorsLoading] = useState(true);
  const [tenorsError, setTenorsError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    minTransaction: 0,
    tenorId: [] as number[],
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Fetch list tenor saat komponen dimuat
  useEffect(() => {
    const fetchTenors = async () => {
      setTenorsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      try {
        const res = await fetch("/api/tenor/list", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Gagal mengambil daftar tenor");
        setTenors(data.data);
      } catch (err: any) {
        console.error("Fetch Tenors Error:", err);
        setTenorsError(err.message || "Gagal memuat tenor");
      } finally {
        setTenorsLoading(false);
      }
    };
    fetchTenors();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "minTransaction" ? parseFloat(value) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleTenorChange = (tenorId: number, isChecked: boolean) => {
    setFormData((prev) => {
      const newTenorIds = isChecked
        ? [...prev.tenorId, tenorId]
        : prev.tenorId.filter((id) => id !== tenorId);
      return { ...prev, tenorId: newTenorIds };
    });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) errors.name = "Installment name is required";
    if (!formData.minTransaction && formData.minTransaction !== 0) {
      errors.minTransaction = "Min transaction is required";
    }
    if (formData.tenorId.length === 0) {
      errors.tenorId = "At least one tenor must be selected";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warning("⚠️ Harap lengkapi semua field yang wajib diisi.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      const res = await fetch("/api/installment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Gagal submit installment");

      toast.success("✅ Installment berhasil dibuat!", {
        description: "Installment baru telah ditambahkan ke sistem.",
      });

      setTimeout(() => {
        router.push("/installment-management");
      }, 1200);
    } catch (err: any) {
      toast.error("❌ Gagal submit installment", {
        description: err.message || "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ComponentCard title="Create Installment">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Installment Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter installment name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>

        <div>
          <Label>Min Transaction</Label>
          <Input
            type="number"
            name="minTransaction"
            placeholder="Enter min transaction amount"
            value={formData.minTransaction}
            onChange={handleInputChange}
          />
          {formErrors.minTransaction && <p className="text-red-500 text-sm">{formErrors.minTransaction}</p>}
        </div>

        <div className="col-span-full">
          <Label>Tenor</Label>
          {tenorsLoading ? (
            <p className="text-gray-500">Loading tenors...</p>
          ) : tenorsError ? (
            <p className="text-red-500">{tenorsError}</p>
          ) : (
            <div className="flex flex-wrap gap-4 mt-2">
              {tenors.map((tenor) => (
                <div key={tenor.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`tenor-${tenor.id}`}
                    name="tenorId"
                    value={tenor.id}
                    checked={formData.tenorId.includes(tenor.id)}
                    onChange={(e) => handleTenorChange(tenor.id, e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`tenor-${tenor.id}`} className="text-sm font-medium text-gray-700">
                    {tenor.durationMonths} Months
                  </label>
                </div>
              ))}
            </div>
          )}
          {formErrors.tenorId && <p className="text-red-500 text-sm mt-1">{formErrors.tenorId}</p>}
        </div>

        <div className="col-span-full">
          <Button type="submit" className="w-full" disabled={isSubmitting || tenorsLoading}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </div>
            ) : (
              "Create Installment"
            )}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
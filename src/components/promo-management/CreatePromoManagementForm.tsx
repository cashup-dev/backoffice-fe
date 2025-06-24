"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import DatePicker from "@/components/form/date-picker";
import { ChevronDownIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import { toast } from "sonner";

export default function CreatePromoManagementForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    promoType: "",
    promoValue: 0,
    minTransaction: 0,
    maxTransaction: 0,
    maxSubsidy: 0,
    channelType: "",
    validFrom: "",
    validTo: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const promoTypeOptions = [
    { value: "PERCENTAGE", label: "Percentage" },
    { value: "FIXED", label: "Fixed Amount" },
  ];

  const channelTypeOptions = [
    { value: "QRIS", label: "QRIS" },
    { value: "CARD", label: "Card" },
    { value: "ALL", label: "All" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = ["promoValue", "minTransaction", "maxTransaction", "maxSubsidy"].includes(name)
      ? parseFloat(value)
      : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field: "validFrom" | "validTo", value: string) => {
    const newFormData = {...formData, [field]: value}

    if(field === "validFrom" && newFormData.validTo && new Date(value) > new Date(newFormData.validTo)){
      newFormData.validTo = value;
    }else if(field === "validTo" && newFormData.validFrom && new Date(value) < new Date(newFormData.validFrom)){
      newFormData.validFrom = value
    }

    //setFormData((prev) => ({ ...prev, [field]: value }));
    setFormData(newFormData);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) errors.name = "Promo name is required";
    if (!formData.promoType) errors.promoType = "Promo type is required";
    if (!formData.promoValue) errors.promoValue = "Promo value is required";
    if (!formData.minTransaction) errors.minTransaction = "Min transaction is required";
    if (!formData.maxTransaction) errors.maxTransaction = "Max transaction is required";
    if (!formData.maxSubsidy) errors.maxSubsidy = "Max subsidy is required";
    if (!formData.channelType) errors.channelType = "Channel type is required";
    if (!formData.validFrom) errors.validFrom = "Valid from date is required";
    if (!formData.validTo) errors.validTo = "Valid to date is required";

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
  
    // Validasi date range (pastikan validFrom <= validTo)
    if (formData.validFrom && formData.validTo && new Date(formData.validFrom) > new Date(formData.validTo)) {
      toast.error("❌ Invalid date range", {
        description: "Tanggal mulai tidak boleh setelah tanggal akhir.",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    try {
      const res = await fetch("/api/promo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.message || "Gagal submit promo");
  
      toast.success("✅ Promo berhasil dibuat!", {
        // description: "Promo kamu telah disimpan ke dalam sistem.",
      });
  
      setTimeout(() => {
        router.push("/promo-management/list");
      }, 1200);
    } catch (err: any) {
      toast.error("❌ Gagal submit promo", {
        description: err.message || "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <ComponentCard title="Create Promo">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Promo Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter promo name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>

        <div>
          <Label>Promo Type</Label>
          <div className="relative">
            <Select
              options={promoTypeOptions}
              placeholder="Select promo type"
              value={formData.promoType}
              onChange={(val) => handleSelectChange("promoType", val)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <ChevronDownIcon />
            </span>
          </div>
          {formErrors.promoType && <p className="text-red-500 text-sm">{formErrors.promoType}</p>}
        </div>

        <div>
          <Label>Promo Value</Label>
          <Input
            type="number"
            name="promoValue"
            placeholder="Enter promo value"
            value={formData.promoValue}
            onChange={handleInputChange}
          />
          {formErrors.promoValue && <p className="text-red-500 text-sm">{formErrors.promoValue}</p>}
        </div>

        <div>
          <Label>Min Transaction</Label>
          <Input
            type="number"
            name="minTransaction"
            placeholder="Enter min transaction"
            value={formData.minTransaction}
            onChange={handleInputChange}
          />
          {formErrors.minTransaction && <p className="text-red-500 text-sm">{formErrors.minTransaction}</p>}
        </div>

        <div>
          <Label>Max Transaction</Label>
          <Input
            type="number"
            name="maxTransaction"
            placeholder="Enter max transaction"
            value={formData.maxTransaction}
            onChange={handleInputChange}
          />
          {formErrors.maxTransaction && <p className="text-red-500 text-sm">{formErrors.maxTransaction}</p>}
        </div>

        <div>
          <Label>Max Subsidy</Label>
          <Input
            type="number"
            name="maxSubsidy"
            placeholder="Enter max subsidy"
            value={formData.maxSubsidy}
            onChange={handleInputChange}
          />
          {formErrors.maxSubsidy && <p className="text-red-500 text-sm">{formErrors.maxSubsidy}</p>}
        </div>

        <div>
          <Label>Channel Type</Label>
          <div className="relative">
            <Select
              options={channelTypeOptions}
              placeholder="Select channel type"
              value={formData.channelType}
              onChange={(val) => handleSelectChange("channelType", val)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <ChevronDownIcon />
            </span>
          </div>
          {formErrors.channelType && <p className="text-red-500 text-sm">{formErrors.channelType}</p>}
        </div>

        <div>
          <DatePicker
            id="valid-from"
            label="Valid From"
            placeholder="Select start date"
            defaultValue={formData.validFrom}
            onChange={(dates, str) => handleDateChange("validFrom", str)}
            maxDate={formData.validTo || undefined} // Tidak boleh lebih dari validTo
          />
          {formErrors.validFrom && <p className="text-red-500 text-sm">{formErrors.validFrom}</p>}
        </div>

        <div>
          <DatePicker
            id="valid-to"
            label="Valid To"
            placeholder="Select end date"
            defaultValue={formData.validTo}
            onChange={(dates, str) => handleDateChange("validTo", str)}
            minDate={formData.validFrom || undefined} // Tidak boleh kurang dari validFrom
          />
          {formErrors.validTo && <p className="text-red-500 text-sm">{formErrors.validTo}</p>}
        </div>

        <div className="col-span-full">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </div>
            ) : (
              "Create Promo"
            )}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}

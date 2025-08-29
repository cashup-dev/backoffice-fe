"use client";
import React, { useState, useEffect } from "react";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { toast } from "sonner";

type Merchant = {
  id: number;
  name: string;
  merchantReference: string;
  merchantUniqueCode: string;
};

// Props diubah untuk installment
type Props = {
  installmentId: number;
  onSuccess?: () => void;
};

export default function InstallmentMerchantBindingForm({ installmentId, onSuccess }: Props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Merchant[]>([]);
  const [selected, setSelected] = useState<Merchant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMerchants = async (keyword: string) => {
    if (!keyword) return setResults([]);

    setIsLoading(true);
    try {
      // TODO: Buat API route ini untuk mencari merchant
      const res = await fetch(`/api/installment/merchant-search?keyword=${encodeURIComponent(keyword)}`);
      if (!res.ok) throw new Error("Gagal fetch merchant");
      const data = await res.json();
      setResults(data.data || []);
    } catch (err) {
      console.error("❌ Gagal fetch merchant:", err);
      toast.error("Gagal mencari merchant");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (merchant: Merchant) => {
    if (!selected.some((m) => m.id === merchant.id)) {
      setSelected((prev) => [...prev, merchant]);
    }
    setSearch("");
    setResults([]);
  };

  const handleRemove = (id: number) => {
    setSelected((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selected.length === 0) {
      toast.warning("⚠️ Pilih minimal satu merchant");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        merchantIds: selected.map((m) => m.id.toString()),
      };

      // TODO: Buat API route ini untuk binding merchant ke installment
      const res = await fetch(`/api/installment/merchant-bind/${installmentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal binding merchant");
      }

      toast.success("✅ Merchant berhasil di-bind ke installment");
      setSelected([]);
      onSuccess?.();
    } catch (err: any) {
      toast.error("❌ Gagal binding", { description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length >= 2) {
        fetchMerchants(search);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Cari Merchant</Label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Ketik nama merchant (min. 2 huruf)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isSubmitting}
        />
        {isLoading && <p className="text-xs text-gray-500 mt-1">Loading...</p>}
        {results.length > 0 && (
          <ul className="border rounded mt-1 max-h-40 overflow-auto bg-white z-10 relative">
            {results.map((m) => (
              <li
                key={m.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSelect(m)}
              >
                <strong>{m.name}</strong> ({m.merchantReference})<br />
                <span className="text-xs text-gray-500">{m.merchantUniqueCode}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected.length > 0 && (
        <div>
          <Label>Merchant Terpilih</Label>
          <ul className="space-y-1 text-sm">
            {selected.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between border px-3 py-2 rounded"
              >
                <div>
                  <strong>{m.name}</strong> ({m.merchantReference})
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(m.id)}
                  className="text-red-500 text-xs hover:underline"
                  disabled={isSubmitting}
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Binding..." : "Bind Merchant to Installment"}
      </Button>
    </form>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { toast } from "sonner";

type Props = {
  promoId: number;
  onSuccess?: () => void;
};

export default function BinBindingForm({ promoId, onSuccess }: Props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBins = async (keyword: string) => {
    if (!keyword || keyword.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch(`/api/promo/bin-search?keyword=${encodeURIComponent(keyword)}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch BINs");
      
      const data = await res.json();
      setResults(data.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch BINs:", err);
      toast.error("Failed to search BINs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (bin: string) => {
    if (!selected.includes(bin)) {
      setSelected((prev) => [...prev, bin]);
    }
    setSearch("");
    setResults([]);
  };

  const handleRemove = (bin: string) => {
    setSelected((prev) => prev.filter((b) => b !== bin));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      setIsSubmitting(true);
  
      const payload = {
        binNumbers: selected // Pastikan sesuai dengan yang diharapkan backend
      };
  
      // Gunakan route Next.js yang sudah dibuat
      const res = await fetch(`/api/promo/bind-bin/${promoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to bind BINs");
      }
  
      toast.success("✅ BINs successfully bound");
      onSuccess?.();
  
    } catch (err: any) {
      toast.error(`❌ Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length >= 2) {
        fetchBins(search);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Search BIN</Label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Type BIN number (min. 2 digits)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isSubmitting}
        />
        {isLoading && <p className="text-xs text-gray-500 mt-1">Loading...</p>}
        {results.length > 0 && (
          <ul className="border rounded mt-1 max-h-40 overflow-auto bg-white z-10 relative">
            {results.map((bin) => (
              <li
                key={bin}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSelect(bin)}
              >
                {bin}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected.length > 0 && (
        <div>
          <Label>Selected BINs</Label>
          <ul className="space-y-1 text-sm">
            {selected.map((bin) => (
              <li
                key={bin}
                className="flex items-center justify-between border px-3 py-2 rounded"
              >
                <div>
                  <strong>{bin}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(bin)}
                  className="text-red-500 text-xs hover:underline"
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Binding..." : "Bind BINs"}
      </Button>
    </form>
  );
}
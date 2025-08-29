"use client";
import React, { useEffect, useState } from "react";
import PromoTable from "@/components/promo-management/PromoTable";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function PromoManagementPage() {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { isAdmin } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      const res = await fetch("/api/promo/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      // console.log("🔥 Full response:", data);

      if (!res.ok) throw new Error(data.message || "Request failed");

      setPromoList(data.data.data); // <- sesuai struktur json API kamu
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    router.push("/promo-management/create");
  };

  const handleEdit = (promo: any) => {
    const encoded = encodeURIComponent(JSON.stringify(promo));
    router.push(`/promo-management/edit?data=${encoded}`);
  };

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Promo Management</h1>
          <Button onClick={handleCreate}>+ Create Promo</Button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : (
        <PromoTable data={promoList} onEdit={handleEdit} />
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import EligibilityTable from "@/components/eligibility-management/EligibilityTable";
import Button from "@/components/ui/button/Button";
import { toast } from "sonner";

export default function EligibilityManagementPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEligibility = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/eligibility/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 0, pageSize: 10 }),
      });
  
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
  
      // ✅ Fix bagian ini
      setData(json.data.data.content || []);
    } catch (err: any) {
      toast.error("Gagal ambil data", { description: err.message });
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.txt";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        await uploadCSV(file);
        fetchEligibility(); // refresh list
      }
    };
    input.click();
  };

  const uploadCSV = async (file: File) => {
    const now = new Date();
    const timestamp = `${now.getDate().toString().padStart(2, "0")}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getFullYear()}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}`;

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const res = await fetch(`/api/eligibility/upload/${timestamp}`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Upload berhasil", {
        description: `${json.data.recordsProcessed} processed, ${json.data.invalidRows} invalid`,
      });
    } catch (err: any) {
      toast.error("Upload gagal", { description: err.message });
    }
  };

  useEffect(() => {
    fetchEligibility();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Eligibility Management</h1>
        <Button onClick={handleUpload}>📤 Upload Eligibility CSV</Button>
      </div>
      {loading ? <p>Loading...</p> : <EligibilityTable data={data} />}
    </div>
  );
}

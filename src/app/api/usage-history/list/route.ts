import { NextResponse } from "next/server";
import { apiServer } from "../../../../../lib/apiServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await apiServer.post("/promo/usage-history", body);
    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Usage History Error:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal mengambil data riwayat penggunaan",
      },
      { status: err?.response?.status || 500 }
    );
  }
}
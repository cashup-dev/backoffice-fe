import { NextResponse } from "next/server";
import { apiServer } from "../../../../../../lib/apiServer";

export async function GET() {
  try {
    const res = await apiServer.get("/promo/stats/usage");
    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Usage Stats Error:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal mengambil data statistik penggunaan",
      },
      { status: err?.response?.status || 500 }
    );
  }
}
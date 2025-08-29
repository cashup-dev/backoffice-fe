// app/api/promo/stats/route.ts
import { NextResponse } from "next/server";
import { apiServer } from "../../../../utils/apiServer";

export async function GET() {
  try {
    const res = await apiServer.get("/promo/stats");
    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Promo Stats Error:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Failed to fetch promo stats",
      },
      { status: err?.response?.status || 500 }
    );
  }
}
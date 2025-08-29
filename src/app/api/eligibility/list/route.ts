import { NextResponse } from "next/server";
import { apiServer } from "../../../../utils/apiServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await apiServer.post("/promo/eligible-list", body);
    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Eligibility List Error:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal mengambil data eligibility",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

import { NextResponse, NextRequest } from "next/server";
import { apiServer } from "@/utils/apiServer";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Endpoint diubah ke endpoint installment
    const res = await apiServer.post("/installment/usage-history", body, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Installment Usage History Error:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal mengambil data riwayat penggunaan",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiServer } from '@/utils/apiServer';

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Endpoint diubah ke endpoint installment BIN bind
    const res = await apiServer.get("/installment-bin-bind/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({ success: true, data: res.data.data });

  } catch (err: any) {
    console.error("❌ Gagal ambil installment BIN bind:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal mengambil data BIN bind",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

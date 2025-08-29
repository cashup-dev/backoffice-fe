import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiServer } from '../../../../utils/apiServer';

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const res = await apiServer.get("/promo/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Gagal ambil promo:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal mengambil data promo",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

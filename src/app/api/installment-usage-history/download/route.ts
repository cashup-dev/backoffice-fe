import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/utils/apiServer";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const params: Record<string, string> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    // Endpoint diubah ke endpoint installment
    const res = await apiServer.get("/installment/usage-history/download", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: Object.keys(params).length ? params : undefined,
      responseType: "arraybuffer",
    });

    const headers = new Headers();
    headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    // Nama file diubah
    headers.set("Content-Disposition", `attachment; filename=installment_usage_report_${new Date().getTime()}.xlsx`);

    return new Response(res.data, { headers });
  } catch (err: any)
    {
    console.error("❌ Download Report Error:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal mengunduh laporan",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

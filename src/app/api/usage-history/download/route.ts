import { NextResponse } from "next/server";
import { apiServer } from "../../../../utils/apiServer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Siapkan params secara kondisional
    const params: Record<string, string> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const res = await apiServer.get("/promo/usage-history/download", {
      params: Object.keys(params).length ? params : undefined,
      responseType: "arraybuffer",
    });

    const headers = new Headers();
    headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.set("Content-Disposition", `attachment; filename=promo_usage_report_${new Date().getTime()}.xlsx`);

    return new Response(res.data, { headers });
  } catch (err: any) {
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
import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "../../../../../utils/apiServer";// pastikan path ini sesuai struktur lo

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  try {
    const res = await apiServer.put(`/promo/update/${id}`, body);
    return NextResponse.json({
      message: "Promo updated successfully",
      data: res.data.data,
    });
  } catch (err: any) {
    console.error("❌ Update Promo Error:", err);
    return NextResponse.json(
      {
        error: "UPDATE_PROMO_FAILED",
        message: err?.response?.data?.message || "Failed to update promo",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

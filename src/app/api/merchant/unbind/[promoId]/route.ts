import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiServer } from "../../../../../utils/apiServer";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ promoId: string }> }
) {
  try {
    const resolvedParams = await params;
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const res = await apiServer.delete(`/merchant-bind/${resolvedParams.promoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: body,
    });

    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Gagal unbind merchant:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal unbind merchant",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

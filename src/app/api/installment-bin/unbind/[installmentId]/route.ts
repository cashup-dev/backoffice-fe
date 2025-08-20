import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiServer } from "@/utils/apiServer";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { installmentId: string } }
) {
  try {
    const { installmentId } = params;
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Endpoint diubah ke endpoint unbind installment BIN
    const res = await apiServer.delete(`/installment-bin-bind/${installmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: body, // Untuk method DELETE dengan body, Axios menggunakan 'data'
    });

    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Gagal unbind BIN dari installment:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal unbind BIN",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

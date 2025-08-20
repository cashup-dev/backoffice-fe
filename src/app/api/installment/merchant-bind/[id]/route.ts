import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiServer } from "@/utils/apiServer";

export async function POST(req: NextRequest, { params }: { params: Promise <{ id: string }> }) {
  const installmentId = (await params).id;
  const body = await req.json();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Endpoint diubah ke endpoint installment
    const response = await apiServer.post(`/installment-merchant-bind/${installmentId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);

  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Failed to bind merchant";

    return NextResponse.json(
      {
        error: "MERCHANT_BIND_FAILED",
        message: errorMessage,
      },
      {
        status: error?.response?.status || 500,
      }
    );
  }
}

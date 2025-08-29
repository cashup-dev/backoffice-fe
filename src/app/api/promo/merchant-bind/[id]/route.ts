import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { apiServer } from "../../../../../utils/apiServer";

export async function POST(req: NextRequest, { params }: { params: Promise<{id: string}> }) {
  const promoId = (await params).id;
  const body = await req.json();

  const token = (await cookies()).get("token")?.value;

  try {
    const response = await apiServer.post(`/merchant-bind/${promoId}`, body, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Failed to bind merchant";

    return new Response(
      JSON.stringify({
        error: "MERCHANT_BIND_FAILED",
        message: errorMessage,
      }),
      {
        status: error?.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

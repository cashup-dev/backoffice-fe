// src/app/api/promo/merchant-search/route.ts
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { apiServer } from "../../../../utils/apiServer"; // sesuaikan path

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const keyword = url.searchParams.get("keyword") || "";
  const token = (await cookies()).get("token")?.value;

  if (!keyword) {
    return new Response(
      JSON.stringify({ error: "KEYWORD_REQUIRED", message: "Keyword query parameter is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const response = await apiServer.get("/midware-bin/search", {
      params: { keyword },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Failed to search merchant";
    return new Response(
      JSON.stringify({
        error: "BIN_SEARCH_FAILED",
        message: errorMessage,
      }),
      {
        status: error?.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

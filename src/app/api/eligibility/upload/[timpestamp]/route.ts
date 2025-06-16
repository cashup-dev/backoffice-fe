import { NextResponse } from "next/server";
import { apiServer } from "../../../../../../lib/apiServer";
import FormDataNode from "form-data";

export async function POST(req: Request, { params }: { params: { timestamp: string } }) {
  try {
    const formData = await req.formData();
    const csvFile = formData.get("csvFile") as File;

    if (!csvFile) throw new Error("File tidak ditemukan");

    const buffer = Buffer.from(await csvFile.arrayBuffer());

    const form = new FormDataNode();
    form.append("csvFile", buffer, {
      filename: "upload.csv",
      contentType: "text/plain",
    });

    const uploadRes = await apiServer.post(
      `/promo/upload-eligibility/${params.timestamp}`,
      form,
      {
        headers: form.getHeaders(), // penting!
      }
    );

    return NextResponse.json({ success: true, data: uploadRes.data });
  } catch (err: any) {
    console.error("❌ Upload CSV Error:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Upload gagal",
      },
      { status: err?.response?.status || 500 }
    );
  }
}

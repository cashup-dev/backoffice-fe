import { NextResponse } from "next/server";
import { apiServer } from "../../../../../../lib/apiServer";
import FormDataNode from "form-data";

export async function POST(req: Request, { params }: { params: { batchId: string } }) {
  try {
    const { batchId } = params;
    const decodedBatchId = decodeURIComponent(batchId);
    console.log('Batch ID received:', decodedBatchId);

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
      `/promo/upload-eligibility/${encodeURIComponent(decodedBatchId)}`,
      form,
      { headers: form.getHeaders() }
    );

    const fixUndefinedBatchId = (data: any) => {
      if (Array.isArray(data)) {
        return data.map(item => ({
          ...item,
          batchId: item.batchId === "undefined" ? decodedBatchId : item.batchId
        }));
      }
      return {
        ...data,
        batchId: data.batchId === "undefined" ? decodedBatchId : data.batchId
      };
    };

    const fixedData = uploadRes.data?.data 
      ? {
          ...uploadRes.data,
          data: {
            ...uploadRes.data.data,
            content: fixUndefinedBatchId(uploadRes.data.data.content || [])
          }
        }
      : fixUndefinedBatchId(uploadRes.data || {});

    return NextResponse.json({ 
      success: true, 
      data: fixedData
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: err?.response?.data?.message || "Upload gagal" },
      { status: err?.response?.status || 500 }
    );
  }
}
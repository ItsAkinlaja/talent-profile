import { NextRequest, NextResponse } from "next/server";
import ImageKit from "@imagekit/nodejs";

function getImageKit() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("Missing IMAGEKIT_PRIVATE_KEY environment variable");
  }
  return new ImageKit({ privateKey });
}

export async function POST(req: NextRequest) {
  try {
    const imagekit = getImageKit();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const fileName = `profile_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    const result = await imagekit.files.upload({
      file: base64,
      fileName,
      folder: "/talent-profiles",
      useUniqueFileName: true,
    });

    return NextResponse.json({ url: result.url, fileId: result.fileId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Dosya alınamadı" }, { status: 400 });
  }

  // Gerçek dosya kaydetme işlemi burada yapılmalı
  // Şimdilik sahte bir URL dönüyoruz
  return NextResponse.json({ photoUrl: "/uploads/avatar.jpg" });
}

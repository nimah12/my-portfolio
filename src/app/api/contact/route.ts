import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "لطفاً همه فیلدها را پر کنید." },
      { status: 400 },
    );
  }

  // فعلاً فقط توی کنسول سرور چاپ می‌کنیم
  console.log("پیام جدید:", { name, email, message });

  return NextResponse.json({ success: true });
}

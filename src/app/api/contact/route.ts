import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "لطفاً همه فیلدها را پر کنید." },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "ایمیل وارد شده معتبر نیست." },
      { status: 400 },
    );
  }

  const toEmail = process.env.CONTACT_EMAIL;
  if (!process.env.RESEND_API_KEY || !toEmail) {
    console.error(
      "RESEND_API_KEY یا CONTACT_EMAIL تنظیم نشده — پیام ارسال نشد.",
    );
    return NextResponse.json(
      { error: "سرویس ایمیل هنوز پیکربندی نشده است." },
      { status: 500 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: "پورتفولیو <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `پیام جدید از پورتفولیو — ${name}`,
      text: `نام: ${name}\nایمیل: ${email}\n\nپیام:\n${message}`,
    });

    if (error) {
      console.error("خطای Resend:", error);
      return NextResponse.json(
        { error: "ارسال پیام با خطا مواجه شد." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("خطای غیرمنتظره در ارسال ایمیل:", err);
    return NextResponse.json(
      { error: "ارسال پیام با خطا مواجه شد." },
      { status: 500 },
    );
  }
}

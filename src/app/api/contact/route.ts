import { NextResponse } from "next/server";
import { Resend } from "resend";

// ── محدودیت نرخ درخواست (درون‌حافظه‌ای) ──
// با متغیرهای محیطی قابل تنظیم است؛ در دیپلوی تک‌نمونه‌ای (مثل Vercel)
// به‌عنوان یک لایه دفاعی سبک عمل می‌کند.
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);

const requests = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    requests.set(ip, recent);
    return true;
  }

  recent.push(now);
  requests.set(ip, recent);

  // تمیزکاری ساده تا Map بی‌حد رشد نکند —
  // ورودی‌هایی که همه‌ی زمان‌هایشان منقضی شده حذف می‌شوند
  if (requests.size > 1000) {
    for (const [key, times] of requests) {
      const stillRecent = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (stillRecent.length === 0) requests.delete(key);
      else requests.set(key, stillRecent);
    }
  }

  return false;
}

// escape کردن ورودی کاربر برای جلوگیری از تزریق HTML در ایمیل
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// قالب HTML ایمیل (RTL) — استایل‌ها inline هستند تا در همه کلاینت‌های ایمیل درست نمایش داده شوند
function buildContactEmailHtml(
  name: string,
  email: string,
  message: string,
): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  return `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Tahoma,'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#0a0a0a;padding:20px 28px;">
              <p style="margin:0;color:#ffffff;font-size:16px;font-weight:bold;">پیام جدید از پورتفولیو</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:14px;">
                    <p style="margin:0;font-size:13px;color:#71717a;">نام فرستنده</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#18181b;font-weight:bold;">${safeName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:18px;">
                    <p style="margin:0;font-size:13px;color:#71717a;">ایمیل فرستنده</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#2563eb;"><a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:13px;color:#71717a;">پیام</p>
                    <div style="background-color:#fafafa;border:1px solid #e4e4e7;border-radius:8px;padding:16px;font-size:14px;line-height:1.9;color:#18181b;white-space:pre-wrap;direction:rtl;text-align:right;">${safeMessage}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px;border-top:1px solid #f0f0f1;background-color:#fafafa;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;">این ایمیل از طریق فرم تماس وب‌سایت ارسال شده است.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  // بدنه‌ی درخواست ممکن است JSON نامعتبر باشد؛ بدون این try/catch
  // یک خطای ۵۰۰ خام به کلاینت برمی‌گشت.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "درخواست نامعتبر است." },
      { status: 400 },
    );
  }

  const { name, email, message, website } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    website?: unknown;
  };

  // هانی‌پات: اگر ربات فیلد مخفی «website» را پر کرده باشد، بدون ارسال
  // ایمیل جواب موفقیت‌آمیز برمی‌گردانیم تا ربات متوجه نشود.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  // محدودیت نرخ درخواست
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "تعداد درخواست‌ها زیاد شده؛ کمی بعد دوباره تلاش کنید." },
      { status: 429 },
    );
  }

  // اعتبارسنجی نوع ورودی‌ها — ورودی غیر رشته‌ای (مثلاً عدد یا آبجکت)
  // قبلاً باعث crash در escapeHtml و خطای ۵۰۰ می‌شد.
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "لطفاً همه فیلدها را پر کنید." },
      { status: 400 },
    );
  }

  if (!name.trim() || !email.trim() || !message.trim()) {
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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  // آدرس فرستنده با CONTACT_FROM قابل تنظیم است؛
  // پیش‌فرض فعلاً onboarding@resend.dev است تا بدون تنظیم هم کار کند.
  const fromEmail =
    process.env.CONTACT_FROM ?? "پورتفولیو <onboarding@resend.dev>";
  if (!apiKey || !toEmail) {
    console.error(
      "RESEND_API_KEY یا CONTACT_EMAIL تنظیم نشده — پیام ارسال نشد.",
    );
    return NextResponse.json(
      { error: "سرویس ایمیل هنوز پیکربندی نشده است." },
      { status: 500 },
    );
  }

  try {
    // ساخت کلاینت فقط هنگام ارسال — چون سازنده‌ی Resend بدون کلید throw می‌کند
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `پیام جدید از پورتفولیو — ${name}`,
      text: `نام: ${name}\nایمیل: ${email}\n\nپیام:\n${message}`,
      html: buildContactEmailHtml(name, email, message),
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

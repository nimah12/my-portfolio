import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // چون در سیستم چند package-lock.json وجود دارد، Next.js ریشه‌ی ورک‌اسپیس را
  // اشتباه تشخیص می‌داد (هشدار هنگام build). با تعیین صریح root برطرف می‌شود.
  turbopack: {
    root: process.cwd(),
  },
  // کش طولانی‌مدت برای تصاویر پروژه (فایل‌هایی که با نام ثابت تغییر نمی‌کنند)
  async headers() {
    return [
      {
        source: "/projects/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/certificates/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

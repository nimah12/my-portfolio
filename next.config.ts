import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // چون در سیستم چند package-lock.json وجود دارد، Next.js ریشه‌ی ورک‌اسپیس را
  // اشتباه تشخیص می‌داد (هشدار هنگام build). با تعیین صریح root برطرف می‌شود.
  turbopack: {
    root: process.cwd(),
  },

  async headers() {
    return [
      // کش طولانی‌مدت برای تصاویر پروژه (فایل‌هایی که با نام ثابت تغییر نمی‌کنند)
      {
        source: "/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/certificates/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // هدرهای امنیتی برای همه‌ی صفحات
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=15552000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

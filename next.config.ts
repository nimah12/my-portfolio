import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // چون در سیستم چند package-lock.json وجود دارد، Next.js ریشه‌ی ورک‌اسپیس را
  // اشتباه تشخیص می‌داد (هشدار هنگام build). با تعیین صریح root برطرف می‌شود.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

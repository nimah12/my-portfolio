export type Project = {
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  tech: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    title: {
      fa: "دیجی‌کلون — فروشگاه اینترنتی فارسی (الهام‌گرفته از دیجی‌کالا)",
      en: "DigiClone — Persian RTL E-commerce Platform",
    },
    description: {
      fa: "فروشگاه اینترنتی «پروداکشن‌گرید» و تمام‌فارسی (RTL) الهام‌گرفته از دیجی‌کالا — کاتالوگ ۱۰۰۰+ محصول، مگامنوی داینامیک، سبد خرید و تسویه چندمرحله‌ای، پنل مدیریت کامل — با معماری مدرن Next.js 16 (App Router، Server Components) و PostgreSQL/Prisma. امنیت در اولویت است: هش رمز با scrypt + salt و مقایسه‌ی timing-safe، توکن‌های HMAC-SHA256، قفل حساب پس از ۵ تلاش ناموفق، محدودیت نرخ به‌ازای IP و هدرهای امنیتی CSP. همراه با ۱۳۵ تست سبز (Vitest، React Testing Library، Playwright)، npm audit با ۰ آسیب‌پذیری و آماده‌ی دیپلوی روی Vercel و Netlify.",
      en: "A production-grade, fully Persian (RTL) e-commerce platform inspired by Digikala — a catalog of 1,000+ products, dynamic mega-menu, cart & multi-step checkout, full admin panel — built on a modern Next.js 16 architecture (App Router, Server Components) with PostgreSQL via Prisma. Security comes first: scrypt + salt password hashing with timing-safe comparison, HMAC-SHA256 auth tokens, account lockout after 5 failed attempts, per-IP rate limiting and CSP security headers. 135+ green tests (Vitest, React Testing Library, Playwright), npm audit with 0 vulnerabilities, and deployment-ready for Vercel & Netlify.",
    },
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    image: "/projects/digiclone-home.png",
    demoUrl: "https://digikala-clone-nine.vercel.app/",
    githubUrl: "https://github.com/nimah12/digikala-clone",
  },
  {
    title: {
      fa: "ارزینو — قیمت لحظه‌ای ارز و طلا",
      en: "Arzino — Real-time Currency & Gold Prices",
    },
    description: {
      fa: "اپلیکیشن وب نمایش قیمت لحظه‌ای ارز، طلا و سکه با نمودارهای قیمتی. شامل احراز هویت کاربران، سیستم هشدار قیمت (وقتی قیمت به مقدار دلخواه برسد، ایمیل دریافت کن) و پنل مدیریت. مشکل نوسان شدید قیمت ارز در بازار ایران را با داده‌های لحظه‌ای حل می‌کند.",
      en: "Web app showing real-time currency, gold and coin prices with price charts. Includes user authentication, a price alert system (get an email when a price reaches your target) and an admin panel. Solves the problem of severe currency fluctuations in the Iranian market with real-time data.",
    },
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/projects/arzino.png",
    demoUrl: "https://arzino-gilt.vercel.app/",
    githubUrl: "https://github.com/nimah12/arzino",
  },
  {
    title: {
      fa: "جایار — رزرو هتل و ویلا در سراسر ایران",
      en: "Jayar — Hotel & Villa Booking Across Iran",
    },
    description: {
      fa: "نسخه‌ی نمایشی (Prototype) یک پلتفرم رزرو اقامتگاه: جستجوی هتل، ویلا و سوئیت در سراسر ایران، فیلتر و مرتب‌سازی نتایج، صفحه اختصاصی برای هر اقامتگاه با رزرو آنلاین، و پنل کامل میزبان برای ثبت ملک و مدیریت رزروها. پیاده‌سازی با جاوااسکریپت خالص (بدون فریمورک) و یک API سبک روی Node.js؛ بدون دیتابیس یا درگاه پرداخت واقعی.",
      en: "A demo/prototype accommodation booking platform: search hotels, villas and suites across Iran, filter and sort results, a dedicated listing page with online booking, and a full host panel to list properties and manage bookings. Built with vanilla JavaScript (no framework) and a lightweight Node.js API; no real database or payment gateway.",
    },
    tech: ["JavaScript", "HTML", "CSS", "Node.js"],
    image: "/projects/jayar.png",
    demoUrl: "https://jayar-nine.vercel.app/",
    githubUrl: "https://github.com/nimah12/Jayar",
  },
  {
    title: {
      fa: "فایلو — لندینگ پیج با تم تیره",
      en: "Fylo — Dark Theme Landing Page",
    },
    description: {
      fa: "راه‌حل چالش Frontend Mentor: صفحه‌ی لندینگ کاملاً ریسپانسیو با تم تیره — چیدمان بهینه در همه‌ی اندازه‌های صفحه، hover state برای همه‌ی عناصر تعاملی و اعتبارسنجی فرم خبرنامه با جاوااسکریپت خالص.",
      en: "Frontend Mentor challenge solution: a fully responsive dark-theme landing page — optimal layout across screen sizes, hover states for every interactive element, and newsletter form validation with vanilla JavaScript.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/fylo.png",
    demoUrl: "https://nimah12.github.io/fylo-dark-theme-landing-page/",
    githubUrl: "https://github.com/nimah12/fylo-dark-theme-landing-page",
  },
];

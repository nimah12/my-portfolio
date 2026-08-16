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
    demoUrl: "https://arzino-gilt.vercel.app/",
    githubUrl: "https://github.com/nimah12/arzino",
  },
  {
    title: {
      fa: "جایار — رزرو هتل و ویلا در سراسر ایران",
      en: "Jayar — Hotel & Villa Booking Across Iran",
    },
    description: {
      fa: "جایار، سامانهٔ کاملاً فارسی و راست‌به‌چپ رزرو اقامتگاه برای جستجو و رزرو هتل، ویلا، سوئیت و اقامتگاه در سراسر ایران است. شامل فیلتر بر اساس شهر، نوع اقامتگاه و ظرفیت، مرتب‌سازی بر اساس قیمت و امتیاز، صفحهٔ جزئیات با گالری، امکانات و نظرات، رزرو آنلاین با محاسبهٔ خودکار قیمت (۱۰٪ هزینهٔ سرویس) و پنل میزبان برای ثبت و مدیریت ملک و تأیید/رد رزروها. بدون هیچ فریم‌ورکی — با جاوااسکریپت خالص، CSS سفارشی، Tailwind CSS و یک سرور محلی Node.js ساخته شده است.",
      en: "Jayar is a fully Persian (RTL) accommodation booking platform to search and reserve hotels, villas, suites and stays across Iran. It features filtering by city, property type and capacity, sorting by price and rating, a detail page with gallery, amenities and reviews, online booking with automatic price calculation (10% service fee), and a host panel to list and manage properties and approve or reject bookings. Built with vanilla JavaScript (no framework), custom CSS, Tailwind CSS and a local Node.js server.",
    },
    tech: ["JavaScript", "HTML", "CSS", "Tailwind CSS", "Node.js"],
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
    demoUrl: "https://nimah12.github.io/fylo-dark-theme-landing-page/",
    githubUrl: "https://github.com/nimah12/fylo-dark-theme-landing-page",
  },
];

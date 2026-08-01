export type Project = {
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
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
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/nimah12/arzino",
  },
  {
    title: {
      fa: "رزروآسان — سیستم رزرو آنلاین خدمات",
      en: "Rezervasan — Online Service Booking System",
    },
    description: {
      fa: "پلتفرم رزرو آنلاین برای سالن‌های زیبایی و آرایشگاه‌ها. مشتری‌ها با تقویم آنلاین وقت رزرو می‌کنند، صاحب کسب‌وکار زمان‌بندی را مدیریت می‌کند و یادآوری رزرو به صورت خودکار ارسال می‌شود. پروژه‌ای کامل شامل دیتابیس، API واقعی، احراز هویت و پنل‌های جداگانه کاربر و مدیر.",
      en: "Online booking platform for beauty salons and barbershops. Customers book appointments with an online calendar, the business owner manages scheduling, and booking reminders are sent automatically. A complete project including database, real API, authentication, and separate user and admin panels.",
    },
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "REST API"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/nimah12/rezervasan",
  },
];

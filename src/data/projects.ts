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
    demoUrl: "https://arzino-gilt.vercel.app/",
    githubUrl: "https://github.com/nimah12/arzino",
  },
  {
    title: {
      fa: "جایار — رزرو هتل و ویلا در سراسر ایران",
      en: "Jayar — Hotel & Villa Booking Across Iran",
    },
    description: {
      fa: "سامانه آنلاین رزرو اقامتگاه با امکان جستجوی هتل، ویلا و سوئیت در سراسر ایران، فیلتر و مرتب‌سازی نتایج بر اساس قیمت و امتیاز، صفحه اختصاصی برای هر اقامتگاه و بخش «میزبان شوید» برای ثبت ملک و کسب درآمد از رزرو.",
      en: "Online accommodation booking platform to search hotels, villas and suites across Iran, filter and sort results by price and rating, view a dedicated page for each listing, and a host section to list a property and earn from bookings.",
    },
    tech: ["JavaScript", "HTML", "CSS"],
    demoUrl: "https://jayar-nine.vercel.app/",
    githubUrl: "https://github.com/nimah12/Jayar",
  },
];

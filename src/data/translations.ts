export const translations = {
  fa: {
    nav: {
      home: "خانه",
      about: "درباره من",
      skills: "مهارت‌ها",
      gallery: "پشت صحنه",
      projects: "نمونه‌کارها",
      contact: "تماس",
    },
    hero: {
      greetingPre: "سلام، من",
      greetingPost: "هستم",
      title: "توسعه‌دهنده فول‌استک | متخصص",
      downloadResume: "دانلود رزومه",
    },
    about: {
      title: "درباره من",
      p1: "من نیما حسنی هستم، توسعه‌دهنده فول‌استک با تمرکز بر React، Next.js، Node.js و JavaScript. تجربه‌ی من فراتر از دانش تئوری است؛ چند پروژه‌ی واقعی را به‌صورت مستقل و به‌طور کامل توسعه داده‌ام — از طراحی رابط کاربری تا اتصال به دیتابیس، ساخت API و دیپلوی نهایی.",
      p2: "در کنار توسعه‌ی فرانت‌اند و بک‌اند، به‌طور فعال از ابزارهای هوش مصنوعی برای تسریع فرآیند توسعه و یادگیری فناوری‌های جدید استفاده می‌کنم. تمرکز اصلی من نوشتن کد تمیز، پیاده‌سازی رابط کاربری واکنش‌گرا، و تحویل محصولی قابل‌استفاده و آماده‌ی بهره‌برداری واقعی است.",
    },
    skills: {
      title: "مهارت‌ها",
    },
    gallery: {
      title: "پشت صحنه",
      subtitle: "لحظاتی از محیط کار و ساخت پروژه‌ها",
      lightbox: "نمایشگر عکس",
      openImage: "باز کردن عکس",
      captions: [
        "در حال حل باگ با تیم",
        "در حال فکر کردن به راه‌حل",
        "در حال کار روی پروژه",
        "کنار تیم، در حال توسعه",
      ],
    },
    projects: {
      title: "نمونه‌کارها",
      demo: "دمو زنده",
      github: "گیت‌هاب",
    },
    contact: {
      title: "تماس با من",
      name: "نام شما",
      email: "ایمیل شما",
      message: "پیام شما",
      send: "ارسال پیام",
      sending: "در حال ارسال...",
      sent: "پیام شما ارسال شد",
      error: "مشکلی پیش آمد، دوباره تلاش کنید.",
      tooMany: "تعداد درخواست‌ها زیاد شد؛ کمی بعد دوباره تلاش کنید.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      gallery: "Behind the Scenes",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greetingPre: "Hi, I'm",
      greetingPost: "",
      title: "Full-Stack Developer | Expert in",
      downloadResume: "Download Resume",
    },
    about: {
      title: "About Me",
      p1: "I'm Nima Hasani, a full-stack developer focused on React, Next.js, Node.js and JavaScript. My experience goes beyond theory — I've independently built several real projects end-to-end, from UI design to database integration, API development and deployment.",
      p2: "Alongside frontend and backend development, I actively use AI tools to speed up development and learn new technologies. My focus is on writing clean code, building responsive interfaces, and shipping products that are ready for real-world use.",
    },
    skills: {
      title: "Skills",
    },
    gallery: {
      title: "Behind the Scenes",
      subtitle: "A few moments from where the projects get built",
      lightbox: "Image lightbox",
      openImage: "Open image",
      captions: [
        "Debugging with the team",
        "Thinking through a solution",
        "Working on the project",
        "Building alongside the team",
      ],
    },
    projects: {
      title: "Projects",
      demo: "Live Demo",
      github: "GitHub",
    },
    contact: {
      title: "Contact Me",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send Message",
      sending: "Sending...",
      sent: "Your message was sent",
      error: "Something went wrong, please try again.",
      tooMany: "Too many requests — please try again in a moment.",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type Translation = (typeof translations)["en"];

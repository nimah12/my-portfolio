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
    },
    about: {
      title: "درباره من",
      p1: "من Nima Hasani هستم، یک توسعه‌دهنده فول‌استک با تمرکز روی JavaScript، React، Next.js و Node.js. چیزی که من رو متمایز می‌کنه اینه که فقط دانش تئوری ندارم — من از تجربه ساخت پروژه‌های واقعی صحبت می‌کنم: از طراحی رابط کاربری تا دیتابیس، API و دیپلوی.",
      p2: "علاوه بر توسعه وب، عاشق آموزش هستم. من در چنل یوتیوبم به کسانی که می‌خوان برنامه‌نویسی رو از صفر شروع کنن، قدم به قدم و با زبان ساده آموزش می‌دم. باور دارم بهترین راه یادگیری، ساختن چیزهای واقعیه.",
    },
    skills: {
      title: "مهارت‌ها",
    },
    gallery: {
      title: "پشت صحنه",
      subtitle: "لحظاتی از محیط کار و ساخت پروژه‌ها",
      captions: [
        "در حال کدنویسی",
        "تمرکز روی یک باگ",
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
    },
    about: {
      title: "About Me",
      p1: "I'm Nima Hasani, a full-stack developer focused on JavaScript, React, Next.js and Node.js. What sets me apart is that I don't just have theoretical knowledge — I speak from experience building real projects: from UI design to database, API and deployment.",
      p2: "Besides web development, I love teaching. On my YouTube channel, I teach people who want to start coding from scratch, step by step and in simple language. I believe the best way to learn is by building real things.",
    },
    skills: {
      title: "Skills",
    },
    gallery: {
      title: "Behind the Scenes",
      subtitle: "A few moments from where the projects get built",
      captions: [
        "Deep in the code",
        "Chasing down a bug",
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
    },
  },
} as const;

export type Language = keyof typeof translations;
export type Translation = (typeof translations)["en"];

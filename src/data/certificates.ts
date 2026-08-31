export type Certificate = {
  title: { fa: string; en: string };
  issuer: string;
  hours: number;
  instructor: string;
  verifyUrl: string;
  image: string;
};

export const certificates: Certificate[] = [
  {
    title: {
      fa: "مبانی ری‌اکت (React JS Basics)",
      en: "React JS Basics",
    },
    issuer: "Maktabkhooneh",
    hours: 9,
    instructor: "Ehsan Gazar",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-VSXQ1I/",
    image: "/certificates/react-js-basics.webp",
  },
  {
    title: {
      fa: "CSS، HTML و جاوااسکریپت پروژه‌محور",
      en: "Project-Based CSS, HTML, and JavaScript",
    },
    issuer: "Maktabkhooneh",
    hours: 10,
    instructor: "Abolfazl Vafadoost",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-O4FAV4F/",
    image: "/certificates/project-based-css-html-js.webp",
  },
  {
    title: {
      fa: "ICDL",
      en: "ICDL",
    },
    issuer: "Maktabkhooneh",
    hours: 27,
    instructor: "Amirhosein Delavar",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-T2XGVF/",
    image: "/certificates/icdl.webp",
  },
  {
    title: {
      fa: "ری‌اکت پیشرفته",
      en: "Advance React JS",
    },
    issuer: "Maktabkhooneh",
    hours: 11,
    instructor: "Ehsan Gazar",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-A1MUMO/",
    image: "/certificates/mk-a1mumo.webp",
  },
  {
    title: {
      fa: "طراحی حرفه‌ای سایت با وردپرس",
      en: "Professional WordPress Website Design",
    },
    issuer: "Maktabkhooneh",
    hours: 27,
    instructor: "mehdi kohandelpour",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-AGDYUD/",
    image: "/certificates/mk-agdyud.webp",
  },
  {
    title: {
      fa: "برنامه‌نویسی پایتون",
      en: "Python Programming",
    },
    issuer: "Maktabkhooneh",
    hours: 18,
    instructor: "Jadi Mirmirani",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-FW26MR/",
    image: "/certificates/mk-fw26mr.webp",
  },
  {
    title: {
      fa: "جاوااسکریپت",
      en: "Javascript",
    },
    issuer: "Maktabkhooneh",
    hours: 11,
    instructor: "Ehsan Gazar",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-KMZNSA/",
    image: "/certificates/mk-kmznsa.webp",
  },
  {
    title: {
      fa: "تایپ‌اسکریپت و برنامه‌نویسی شی‌گرا در جاوااسکریپت (دوره فشرده)",
      en: "TypeScript and Object Oriented Programming in JavaScript Crash Course",
    },
    issuer: "Maktabkhooneh",
    hours: 3,
    instructor: "Abolfazl Vafadoost",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-OUVXY9/",
    image: "/certificates/mk-ouvxy9.webp",
  },
];

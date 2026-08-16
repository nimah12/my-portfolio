export type Certificate = {
  title: { fa: string; en: string };
  issuer: string;
  hours: number;
  instructor: string;
  date: string;
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
    date: "2026-07-25",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-VSXQ1I/",
    image: "/certificates/react-js-basics.png",
  },
  {
    title: {
      fa: "CSS، HTML و جاوااسکریپت پروژه‌محور",
      en: "Project-Based CSS, HTML, and JavaScript",
    },
    issuer: "Maktabkhooneh",
    hours: 10,
    instructor: "Abolfazl Vafadoost",
    date: "2026-07-24",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-O4FAV4F/",
    image: "/certificates/project-based-css-html-js.png",
  },
  {
    title: {
      fa: "ICDL",
      en: "ICDL",
    },
    issuer: "Maktabkhooneh",
    hours: 27,
    instructor: "Amirhosein Delavar",
    date: "2026-07-25",
    verifyUrl: "https://maktabkhooneh.org/certificates/MK-T2XGVF/",
    image: "/certificates/icdl.png",
  },
];

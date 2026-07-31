export type Project = {
  title: string;
  description: string;
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    title: "پروژه اول",
    description: "توضیح کوتاهی درباره این پروژه و مشکلی که حل می‌کند.",
    tech: ["React", "Next.js", "TypeScript"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project1",
  },
  {
    title: "پروژه دوم",
    description: "توضیح کوتاهی درباره این پروژه و مشکلی که حل می‌کند.",
    tech: ["Node.js", "Express", "MongoDB"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project2",
  },
];

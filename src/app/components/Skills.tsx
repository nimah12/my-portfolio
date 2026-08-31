"use client";

import { useEffect, useRef } from "react";
import { useApp } from "../providers";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "Tailwind CSS",
  "Git",
  "REST API",
];

export default function Skills() {
  const { t } = useApp();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [titleRef.current, gridRef.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 scroll-mt-20"
    >
      <div className="glass w-full max-w-3xl flex flex-col items-center px-8 py-12 md:px-12 rounded-3xl">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 animate-on-scroll"
        >
          {t.skills.title}
        </h2>

        <div
          ref={gridRef}
          className="flex flex-wrap justify-center gap-4 max-w-2xl animate-on-scroll"
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-block glass-soft px-5 py-2 rounded-full text-gray-700 dark:text-gray-200 text-sm md:text-base cursor-default hover:bg-white/80 dark:hover:bg-white/20 hover:border-violet-500/60 dark:hover:border-violet-400/60 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/25 hover:text-violet-600 dark:hover:text-violet-300 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        {skills.map((skill, i) => (
          <span
            key={skill}
            className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm md:text-base cursor-default hover:border-gray-500 dark:hover:border-gray-400 hover:scale-110 transition-all duration-300"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

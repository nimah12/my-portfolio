"use client";

import { useEffect, useRef } from "react";
import { useApp } from "../providers";
import { projects } from "@/data/projects";

export default function Projects() {
  const { t, lang } = useApp();
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
      { threshold: 0.15 }
    );

    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 scroll-mt-20"
    >
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-on-scroll"
      >
        {t.projects.title}
      </h2>

      <div
        ref={gridRef}
        className="grid gap-6 md:grid-cols-2 max-w-4xl w-full animate-on-scroll"
      >
        {projects.map((project, i) => (
          <div
            key={project.title[lang]}
            className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-transparent"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {project.title[lang]}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              <span dir="auto">{project.description[lang]}</span>
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.projects.demo}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:underline"
                >
                  {t.projects.github}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useApp } from "../providers";

export default function About() {
  const { t } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 scroll-mt-20"
    >
      <div ref={ref} className="max-w-2xl text-center animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {t.about.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-loose mb-4">
          <span dir="auto">{t.about.p1}</span>
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-loose">
          <span dir="auto">{t.about.p2}</span>
        </p>
      </div>
    </section>
  );
}

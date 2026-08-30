"use client";

import { useEffect, useRef } from "react";
import { useApp } from "../providers";
import { certificates } from "@/data/certificates";

export default function Certificates() {
  const { t, lang } = useApp();
  const isRtl = lang === "fa";
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
      id="certificates"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 scroll-mt-20"
    >
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-on-scroll"
      >
        {t.certificates.title}
      </h2>

      <div
        ref={gridRef}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full animate-on-scroll"
      >
        {certificates.map((cert, i) => (
          <div
            key={cert.title[lang]}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-transparent"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cert.image}
              alt={cert.title[lang]}
              className="w-full aspect-[16/10] object-cover object-top border-b border-gray-200 dark:border-gray-800"
            />
            <div className={`p-6 ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                <span dir="auto">{cert.title[lang]}</span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {cert.issuer} · {cert.hours} {t.certificates.hours}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {cert.instructor}
              </p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t.certificates.verify}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useApp } from "../providers";

const photos = [
  { src: "/gallery/workspace-1.jpg" },
  { src: "/gallery/workspace-2.jpg" },
  { src: "/gallery/workspace-3.jpg" },
];

export default function Gallery() {
  const { t } = useApp();
  const titleRef = useRef<HTMLDivElement>(null);
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
      id="gallery"
      className="flex flex-col items-center justify-center px-4 py-20 scroll-mt-20"
    >
      <div ref={titleRef} className="text-center mb-12 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {t.gallery.title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          <span dir="auto">{t.gallery.subtitle}</span>
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full animate-on-scroll"
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={t.gallery.captions[i]}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span dir="auto">{t.gallery.captions[i]}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useApp } from "../providers";

const Lanyard = dynamic(() => import("./Lanyard/Lanyard"), { ssr: false });

const photos = [
  { src: "/gallery/workspace-4.jpg" },
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
        className="grid gap-6 sm:grid-cols-2 max-w-4xl w-full animate-on-scroll"
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className="relative h-[460px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <Lanyard frontImage={photo.src} />
            <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium drop-shadow">
              <span dir="auto">{t.gallery.captions[i]}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useApp } from "../providers";
import ClassicGallery from "./ClassicGallery";

const Lanyard = dynamic(() => import("./Lanyard/Lanyard"), { ssr: false });

const photos = [
  { src: "/gallery/workspace-4.jpg" },
  { src: "/gallery/workspace-1.jpg" },
  { src: "/gallery/workspace-2.jpg" },
  { src: "/gallery/workspace-3.jpg" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export default function Gallery() {
  const { t } = useApp();
  const isMobile = useIsMobile();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
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
    observer.observe(el);
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

      {isMobile ? (
        <ClassicGallery />
      ) : (
        <div className="w-full max-w-4xl rounded-3xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 bg-white/40 dark:bg-white/5">
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo, i) => (
              <div
                key={photo.src}
                className="relative h-[300px] sm:h-[360px] rounded-xl overflow-hidden"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <Lanyard frontImage={photo.src} />
                <p className="absolute bottom-2 left-2 right-2 text-white text-xs sm:text-sm font-medium drop-shadow">
                  <span dir="auto">{t.gallery.captions[i]}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

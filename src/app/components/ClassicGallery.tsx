"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "../providers";

const photos = [
  { src: "/gallery/workspace-4.jpg" },
  { src: "/gallery/workspace-1.jpg" },
  { src: "/gallery/workspace-2.jpg" },
  { src: "/gallery/workspace-3.jpg" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ClassicGallery() {
  const { t } = useApp();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
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

  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = lightboxRef.current;
    if (dialog) dialog.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveIndex(null);
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((i) =>
          i === null ? null : (i + photos.length - 1) % photos.length
        );
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
        return;
      }

      if (e.key !== "Tab" || !dialog) return;

      const focusables = dialog.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  function next() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }

  function prev() {
    setActiveIndex((i) =>
      i === null ? null : (i + photos.length - 1) % photos.length
    );
  }

  return (
    <>
      <div
        ref={gridRef}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full animate-on-scroll"
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            role="button"
            tabIndex={0}
            onClick={() => setActiveIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveIndex(i);
              }
            }}
            aria-label={`${t.gallery.captions[i]} — ${t.gallery.openImage}`}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
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

      {isOpen && activeIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.lightbox}
          tabIndex={-1}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in outline-none"
          onClick={() => setActiveIndex(null)}
        >
          <button
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors"
          >
            <svg
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors"
          >
            <svg
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <figure
            className="max-w-4xl w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[activeIndex].src}
              alt={t.gallery.captions[activeIndex]}
              className="max-h-[75vh] w-auto mx-auto rounded-lg shadow-2xl object-contain animate-fade-in"
            />
            <figcaption className="text-white/90 text-sm md:text-base mt-4">
              <span dir="auto">{t.gallery.captions[activeIndex]}</span>
            </figcaption>
            <p className="text-white/50 text-xs mt-2 tabular-nums">
              {activeIndex + 1} / {photos.length}
            </p>
          </figure>
        </div>
      )}
    </>
  );
}

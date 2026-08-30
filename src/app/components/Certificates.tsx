"use client";

import { useEffect, useRef } from "react";
import { useApp } from "../providers";
import { certificates } from "@/data/certificates";
import DepthCarousel from "./DepthCarousel";

export default function Certificates() {
  const { t, lang } = useApp();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [titleRef.current, carouselRef.current].filter(Boolean);

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

  const carouselItems = certificates.map((cert) => ({
    image: cert.image,
    alt: cert.title[lang],
  }));

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
        ref={carouselRef}
        className="w-full max-w-5xl animate-on-scroll"
        style={{ height: '500px', position: 'relative' }}
      >
        <DepthCarousel
          items={carouselItems}
          depth={220}
          spread={90}
          tilt={22}
          tiltDirection="right"
          perspective={1400}
          visibleCards={4}
          falloff={0.2}
          blur={6}
          autoplay
          loop
          cardWidth={300}
          cardHeight={380}
        />
      </div>
    </section>
  );
}

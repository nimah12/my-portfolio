"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "../providers";
import { certificates } from "@/data/certificates";
import DepthCarousel from "./DepthCarousel";

export default function Certificates() {
  const { t, lang } = useApp();
  const isRtl = lang === "fa";
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const els = [titleRef.current, carouselRef.current, infoRef.current].filter(Boolean);

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

  const activeCert = certificates[activeIndex];

  return (
    <section
      id="certificates"
      className="overflow-x-clip px-4 py-24 scroll-mt-20"
    >
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center animate-on-scroll"
      >
        {t.certificates.title}
      </h2>

      <div
        ref={carouselRef}
        className="w-full max-w-5xl mx-auto animate-on-scroll"
        style={{ height: '420px', position: 'relative' }}
      >
        <DepthCarousel
          items={carouselItems}
          depth={200}
          spread={100}
          tilt={20}
          tiltDirection="right"
          perspective={1400}
          visibleCards={4}
          falloff={0.2}
          blur={6}
          autoplay
          loop
          cardWidth={380}
          cardHeight={240}
          onChange={(idx) => setActiveIndex(idx)}
        />
      </div>

      {activeCert && (
        <div
          ref={infoRef}
          className={`w-full max-w-2xl mx-auto mt-10 px-8 py-8 rounded-2xl glass text-center animate-on-scroll ${isRtl ? "text-right" : "text-left"}`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            <span dir="auto">{activeCert.title[lang]}</span>
          </h3>
          <p className="text-sm text-gray-400 mb-1">
            {activeCert.issuer} · {activeCert.hours} {t.certificates.hours}
          </p>
          <p className="text-sm text-gray-400 mb-4">
            {activeCert.instructor}
          </p>
          <a
            href={activeCert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors border border-white/10 hover:border-white/20 rounded-full px-6 py-2.5"
          >
            {t.certificates.verify}
          </a>
        </div>
      )}
    </section>
  );
}

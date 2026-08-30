"use client";

import { useState } from "react";
import { useApp } from "../providers";
import ProfileCard from "./ProfileCard";
import ParticleText from "./ParticleText";

export default function Hero() {
  const { t } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);

  const particleColor = "#ffffff";
  const particleHighlight = "#8b5cf6";

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 scroll-mt-20"
    >
      <div className="w-full flex flex-col items-center animate-fade-up">
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400">
          {t.hero.greetingPre}
        </p>

        <button
          onClick={() => setProfileOpen(true)}
          aria-label="Show profile"
          className="w-full max-w-3xl block cursor-pointer mt-2"
        >
          <ParticleText
            text="Nima Hasani"
            color={particleColor}
            highlightColor={particleHighlight}
            particleSize={2}
            density={4}
            scatter={180}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0.7}
            trigger="mount"
            fontSize="clamp(2.5rem, 11vw, 7rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow={false}
          />
        </button>

        {t.hero.greetingPost && (
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mt-2">
            {t.hero.greetingPost}
          </p>
        )}
      </div>

      <p className="mt-8 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl animate-fade-up-delay">
        {t.hero.title}{" "}
        <span dir="ltr" className="text-gray-700 dark:text-gray-300">
          React, Next.js, Node.js
        </span>
      </p>

      <a
        href="/resume.pdf"
        download
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-gray-900 dark:hover:border-white hover:scale-105 transition-all duration-300 animate-fade-up-delay text-sm font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v12" />
          <path d="M7 10l5 5 5-5" />
          <path d="M4 21h16" />
        </svg>
        {t.hero.downloadResume}
      </a>

      <ProfileCard open={profileOpen} onClose={() => setProfileOpen(false)} />
    </section>
  );
}

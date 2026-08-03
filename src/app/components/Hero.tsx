"use client";

import { useState } from "react";
import { useApp } from "../providers";
import ProfileCard from "./ProfileCard";

export default function Hero() {
  const { t } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 scroll-mt-20"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-up">
        <span className="text-gray-900 dark:text-white">{t.hero.greetingPre}</span>{" "}
        <button
          onClick={() => setProfileOpen(true)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline decoration-dotted underline-offset-8 transition-colors cursor-pointer inline"
          aria-label="Show profile"
        >
          Nima Hasani
        </button>
        {t.hero.greetingPost && (
          <span className="text-gray-900 dark:text-white">
            {" "}
            {t.hero.greetingPost}
          </span>
        )}
      </h1>
      <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl animate-fade-up-delay">
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

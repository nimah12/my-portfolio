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

      <ProfileCard open={profileOpen} onClose={() => setProfileOpen(false)} />
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useApp } from "../providers";
import Clock from "./Clock";

// شناسه‌های بخش‌ها ثابت هستند و به زبان وابسته نیستند
const SECTION_IDS = ["hero", "about", "skills", "gallery", "projects", "certificates", "contact"];

export default function Navbar() {
  const { lang, setLang, t } = useApp();
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.certificates, href: "#certificates" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 dark:bg-black/30 backdrop-blur-xl border-b border-white/10 dark:border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6">

        {/* ── ساعت و تاریخ ── */}
        <Clock />

        {/* ── لینک‌های دسکتاپ ── */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`text-sm transition-colors ${
                  active === link.href
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── دکمه‌های زبان و تم ── */}
        <div className="flex items-center gap-3">
          {/* دکمه زبان */}
          <button
            onClick={() => setLang(lang === "fa" ? "en" : "fa")}
            className="text-sm text-gray-400 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
            aria-label="Switch language"
          >
            {lang === "fa" ? "EN" : "فا"}
          </button>

          {/* ── دکمه همبرگر (موبایل) ── */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── منوی موبایل ── */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 pb-6 border-b border-white/10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`text-sm transition-colors ${
                  active === link.href
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

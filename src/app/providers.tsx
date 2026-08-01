"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Language } from "@/data/translations";

type Theme = "dark" | "light";

type AppContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof translations)[Language];
  theme: Theme;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("fa");
  const [theme, setTheme] = useState<Theme>("dark");

  // ── زبان ──
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved === "fa" || saved === "en") {
      setLangState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "fa" ? "rtl" : "ltr";
    }
  }, []);

  function setLang(lang: Language) {
    setLangState(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }

  // ── تم ──
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }

  return (
    <AppContext.Provider
      value={{ lang, setLang, t: translations[lang], theme, toggleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

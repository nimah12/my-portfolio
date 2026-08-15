"use client";

import { createContext, useContext, useState } from "react";
import { translations, type Language } from "@/data/translations";

export type Theme = "dark" | "light";

type AppContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof translations)[Language];
  theme: Theme;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

const YEAR = 60 * 60 * 24 * 365;

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${YEAR}; samesite=lax`;
}

export function AppProvider({
  children,
  initialLang,
  initialTheme,
}: {
  children: React.ReactNode;
  initialLang: Language;
  initialTheme: Theme;
}) {
  // مقدار اولیه از سمت سرور (کوکی) می‌آید؛ بنابراین اولین رندرِ کلاینت دقیقاً
  // با HTML سرور یکی است و هیچ فلش یا اختلاف hydration وجود ندارد.
  const [lang, setLangState] = useState<Language>(initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  function setLang(lang: Language) {
    setLangState(lang);
    setCookie("lang", lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      setCookie("theme", next);
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

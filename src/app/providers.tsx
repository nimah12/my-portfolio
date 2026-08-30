"use client";

import { createContext, useContext, useState } from "react";
import { translations, type Language } from "@/data/translations";

type AppContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof translations)[Language];
};

const AppContext = createContext<AppContextType | null>(null);

const YEAR = 60 * 60 * 24 * 365;

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${YEAR}; samesite=lax`;
}

export function AppProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);

  function setLang(lang: Language) {
    setLangState(lang);
    setCookie("lang", lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }

  return (
    <AppContext.Provider
      value={{ lang, setLang, t: translations[lang] }}
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

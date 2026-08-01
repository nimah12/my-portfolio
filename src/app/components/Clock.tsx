"use client";

import { useEffect, useState } from "react";
import { useApp } from "../providers";

export default function Clock() {
  const { lang } = useApp();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-sm text-right leading-tight">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    );
  }

  const time = now.toLocaleTimeString(lang === "fa" ? "fa-IR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = now.toLocaleDateString(lang === "fa" ? "fa-IR" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="text-gray-500 dark:text-gray-400 text-sm text-right leading-tight tabular-nums"
    >
      <div className="font-semibold text-gray-700 dark:text-gray-300" dir="ltr">
        {time}
      </div>
      <div className="text-xs">{date}</div>
    </div>
  );
}

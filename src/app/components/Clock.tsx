"use client";

import { useSyncExternalStore } from "react";
import { useApp } from "../providers";

// مقدار placeholder برای رندر سمت سرور — با Epoch که تاریخ واقعی نمایش ندهد
const PLACEHOLDER = new Date(0);

let currentTime = new Date();

function subscribe(callback: () => void) {
  const id = setInterval(() => {
    currentTime = new Date();
    callback();
  }, 1000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return currentTime;
}

function getServerSnapshot() {
  return PLACEHOLDER;
}

export default function Clock() {
  const { lang } = useApp();
  // useSyncExternalStore ساعت را بدون setState داخل effect و بدون
  // اختلاف hydration به‌روز می‌کند (رندر سرور همیشه placeholder می‌گیرد).
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (now === PLACEHOLDER) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-sm text-right leading-tight">
        <div>&nbsp;</div>
        <div className="hidden sm:block">&nbsp;</div>
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
      {/* تاریخ فقط از sm به بالا — در موبایل جای نوار بالا را تنگ نمی‌کند */}
      <div className="hidden text-xs sm:block">{date}</div>
    </div>
  );
}

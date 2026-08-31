"use client";

import { useApp } from "../providers";
import ScrollExpand from "./ScrollExpand";

/**
 * بخش «نمایش سینمایی» بین Hero و About.
 * از کامپوننت ScrollExpand (ری‌اکت‌بیتز) استفاده می‌کند: قاب عکس با اسکرول
 * باز می‌شود، تمام‌صفحه می‌شود و بعد متن روی آن ظاهر می‌گردد.
 * با useWindowScroll حرکت اسکرولِ خودِ صفحه محرک انیمیشن است تا با
 * بقیه‌ی صفحه یکپارچه باشد.
 */
export default function ScrollShowcase() {
  const { t } = useApp();

  return (
    <section className="relative" aria-label={t.showcase.title}>
      <ScrollExpand
        src="/gallery/workspace-2.jpg"
        alt={t.showcase.alt}
        title={t.showcase.title}
        scrollHint={t.showcase.scrollHint}
        useWindowScroll
      >
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
          <span dir="auto">{t.showcase.overlayTitle}</span>
        </h3>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-xl">
          <span dir="auto">{t.showcase.overlayText}</span>
        </p>
        <a
          href="#about"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-300"
        >
          {t.showcase.cta}
        </a>
      </ScrollExpand>
    </section>
  );
}
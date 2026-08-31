"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useApp } from "../providers";
import ProfileCard from "./ProfileCard";
import ParticleText from "./ParticleText";
import "./Hero.css";

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

// طول سکانس اسکرول اضافه‌ی هیرو، بر حسب ارتفاع ویوپورت
const SCROLL_EXTRA = 1.15;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * هیرو اسکرول‌محور: کاربر در ورود فقط نام ذره‌ای «Nima Hasani» را می‌بیند.
 * با اسکرول، نام با بلور و بزرگ‌شدن محو می‌شود، معرفی جای آن را می‌گیرد و
 * در پایان سکانس بقیه‌ی سایت به‌طور طبیعی از پایین روی هیرو سوار می‌شود
 * (الگوی sticky مانند ScrollExpand).
 */
export default function Hero() {
  const { t } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  // reduced-motion با useSyncExternalStore خوانده می‌شود — بدون setState داخل effect
  const isStatic = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const rootRef = useRef<HTMLElement>(null);
  const nameLayerRef = useRef<HTMLDivElement>(null);
  const introLayerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // با کاهش حرکت، سکانس اسکرول غیرفعال و چیدمان ایستا می‌شود
    if (isStatic) {
      root.style.height = "";
      return;
    }

    let trackExtra = 0;
    let raf = 0;
    let current = 0;
    let target = 0;
    let running = false;

    const apply = (p: number) => {
      const name = nameLayerRef.current;
      const intro = introLayerRef.current;
      const hint = hintRef.current;

      if (name) {
        // ۰ → ۰٫۴: نفس‌کشیدن آرام | ۰٫۴ → ۰٫۷۵: خروج با بلور و بزرگ‌شدن
        const breathe = 1 + 0.06 * smoothstep(0, 0.4, p);
        const out = smoothstep(0.4, 0.75, p);
        name.style.opacity = String(1 - out);
        name.style.transform = `translate3d(0, ${(-48 * out).toFixed(2)}px, 0) scale(${(breathe + 0.22 * out).toFixed(4)})`;
        name.style.filter = `blur(${(12 * out).toFixed(2)}px)`;
        name.style.pointerEvents = out > 0.5 ? "none" : "auto";
        name.style.visibility = out >= 0.999 ? "hidden" : "visible";
      }

      if (intro) {
        const inn = smoothstep(0.5, 0.82, p);
        intro.style.opacity = String(inn);
        intro.style.transform = `translate3d(0, ${(28 * (1 - inn)).toFixed(2)}px, 0)`;
        intro.style.visibility = inn <= 0.02 ? "hidden" : "visible";
        intro.style.pointerEvents = inn > 0.6 ? "auto" : "none";
      }

      if (hint) {
        const gone = smoothstep(0, 0.1, p);
        hint.style.opacity = String(1 - gone);
        hint.style.transform = `translate3d(0, ${(10 * gone).toFixed(2)}px, 0)`;
      }
    };

    const measure = () => {
      const vh = window.innerHeight;
      trackExtra = vh * SCROLL_EXTRA;
      root.style.height = `${Math.round(vh + trackExtra)}px`;
    };

    const readProgress = () => {
      const top = root.getBoundingClientRect().top;
      return clamp(-top / Math.max(1, trackExtra), 0, 1);
    };

    const tick = () => {
      // نرمی دنبال‌کردن اسکرول (مانند ScrollExpand)
      const k = 1 - Math.exp(-1 / (60 * 0.09));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      apply(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      apply(current);
    };

    measure();
    target = readProgress();
    current = target;
    apply(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      root.style.height = "";
    };
  }, [isStatic]);

  return (
    <section
      ref={rootRef}
      id="hero"
      className={`hero-intro${isStatic ? " hero--static" : ""}`}
    >
      <div className="hero-sticky">
        {/* ── لایه‌ی نام: تنها چیزی که در ورود دیده می‌شود ── */}
        <div ref={nameLayerRef} className="hero-name-layer">
          <button
            onClick={() => setProfileOpen(true)}
            aria-label="Show profile"
            className="hero-name-button"
          >
            <ParticleText
              text="Nima Hasani"
              color="#ffffff"
              highlightColor="#8b5cf6"
              particleSize={2.5}
              density={4}
              scatter={180}
              gatherDuration={1600}
              stagger={420}
              pointerRepel={40}
              repelRadius={120}
              idleDrift={0.7}
              trigger="mount"
              fontSize="clamp(3rem, 14vw, 9rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow={false}
            />
          </button>
        </div>

        {/* ── لایه‌ی معرفی: با اسکرول جای نام را می‌گیرد ── */}
        <div ref={introLayerRef} className="hero-intro-layer">
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400">
            {t.hero.greetingPre}{" "}
            <span
              dir="ltr"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Nima Hasani
            </span>
            {t.hero.greetingPost ? ` ${t.hero.greetingPost}` : ""}
          </p>

          <p className="mt-6 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl">
            {t.hero.title}{" "}
            <span dir="ltr" className="text-gray-700 dark:text-gray-300">
              React, Next.js, Node.js
            </span>
          </p>

          <a
            href="/resume.pdf"
            download
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-gray-900 dark:hover:border-white hover:scale-105 transition-all duration-300 text-sm font-medium"
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
        </div>

        {/* ── راهنمای اسکرول ── */}
        <div ref={hintRef} className="hero-scroll-hint" aria-hidden="true">
          <span className="hero-scroll-hint__mouse">
            <span className="hero-scroll-hint__wheel" />
          </span>
          <span className="hero-scroll-hint__text">{t.hero.scrollHint}</span>
        </div>
      </div>

      <ProfileCard open={profileOpen} onClose={() => setProfileOpen(false)} />
    </section>
  );
}

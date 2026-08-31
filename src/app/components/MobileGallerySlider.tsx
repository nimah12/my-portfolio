"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useApp } from "../providers";
import "./MobileGallerySlider.css";

const photos = [
  { src: "/gallery/workspace-4.jpg" },
  { src: "/gallery/workspace-1.jpg" },
  { src: "/gallery/workspace-2.jpg" },
  { src: "/gallery/workspace-3.jpg" },
];

const SWIPE_THRESHOLD = 70; // حداقل جابه‌جایی px برای شمرده‌شدن به‌عنوان سوایپ
const EXIT_MS = 420; // مدت انیمیشن خروج کارت بالا

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
};

/**
 * اسلایدر موبایل «پشت صحنه» — دسته‌ی پولاروید.
 * عکس‌ها مثل دسته عکس چاپ‌شده روی هم می‌نشینند؛ کارتِ بالا با کشیدن انگشت
 * (یا دکمه‌ها/کیبورد) با چرخش از دسته خارج می‌شود و عکس بعدی نمایان می‌شود.
 * کاملاً متفاوت از نسخه‌ی دسکتاپ (لنیارد سه‌بعدی) طراحی شده است.
 */
export default function MobileGallerySlider() {
  const { t, lang } = useApp();
  const [order, setOrder] = useState<number[]>(photos.map((_, i) => i));
  const [drag, setDrag] = useState<DragState | null>(null);
  const [exiting, setExiting] = useState<1 | -1 | null>(null);
  const [suppressTransition, setSuppressTransition] = useState(false);

  const dragRef = useRef<DragState | null>(null);
  const exitingRef = useRef(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionRef = useRef(false);

  const topIndex = order[0];
  const numberFmt = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US");

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  // بعد از جابه‌جایی ترتیب کارت‌ها، ترنزیشن یک فریم خاموش می‌شود تا کارتِ
  // جابه‌جا شده بدون انیمیشن عجیب، سرِ جای جدید در پشت دسته بنشیند.
  const settleAfterReorder = useCallback(() => {
    setSuppressTransition(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSuppressTransition(false));
    });
  }, []);

  const advance = useCallback(
    (exitDir: 1 | -1) => {
      if (exitingRef.current || dragRef.current) return;
      if (reducedMotionRef.current) {
        setOrder((o) => [...o.slice(1), o[0]]);
        settleAfterReorder();
        return;
      }
      exitingRef.current = true;
      setExiting(exitDir);
      exitTimerRef.current = setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        exitingRef.current = false;
        setExiting(null);
        setDrag(null);
        settleAfterReorder();
      }, EXIT_MS);
    },
    [settleAfterReorder],
  );

  const next = useCallback(() => advance(1), [advance]);

  const prev = useCallback(() => {
    if (exitingRef.current || dragRef.current) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
    settleAfterReorder();
  }, [settleAfterReorder]);

  const goTo = useCallback(
    (photoIdx: number) => {
      if (exitingRef.current || dragRef.current) return;
      setOrder((o) => {
        if (o[0] === photoIdx) return o;
        const at = o.indexOf(photoIdx);
        if (at === -1) return o;
        return [o[at], ...o.slice(0, at), ...o.slice(at + 1)];
      });
      settleAfterReorder();
    },
    [settleAfterReorder],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (exitingRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      dx: 0,
      dy: 0,
    };
    setDrag({ ...dragRef.current });
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    d.dx = e.clientX - d.startX;
    d.dy = e.clientY - d.startY;
    setDrag({ ...d });
  };

  const endDrag = (e: ReactPointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    dragRef.current = null;

    if (Math.abs(d.dx) > SWIPE_THRESHOLD) {
      // سوایپ در هر دو جهت = رفتن به عکس بعدی؛ جهت فقط مسیر پرت‌شدن کارت را تعیین می‌کند
      setDrag({ ...d });
      advance(d.dx > 0 ? 1 : -1);
    } else {
      setDrag(null); // با ترنزیشن CSS به جای خودش برمی‌گردد
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const topStyle: CSSProperties = exiting
    ? {
        transform: `translate(calc(${exiting * 135}% + ${drag?.dx ?? 0}px), ${(drag?.dy ?? 0) * 0.4}px) rotate(${exiting * 24}deg)`,
        opacity: 0,
        transition: suppressTransition
          ? "none"
          : `transform ${EXIT_MS}ms cubic-bezier(0.3, 0.9, 0.35, 1), opacity ${EXIT_MS}ms ease-out`,
      }
    : drag
      ? {
          transform: `translate(${drag.dx}px, ${drag.dy * 0.45}px) rotate(${drag.dx * 0.055}deg) scale(1.03)`,
          transition: "none",
        }
      : {};

  const behindStyle = (depth: number): CSSProperties => {
    const side = depth % 2 === 0 ? 1 : -1;
    return {
      transform: `translateY(${depth * 13}px) translateX(${side * depth * 7}px) rotate(${side * depth * 3.2}deg) scale(${1 - depth * 0.05})`,
      opacity: depth >= 3 ? 0 : 1 - depth * 0.14,
      filter: `brightness(${1 - depth * 0.13})`,
      zIndex: 10 - depth,
    };
  };

  return (
    <div
      className="mgs"
      role="group"
      aria-roledescription="carousel"
      aria-label={t.gallery.title}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="mgs__deck">
        {order.map((photoIdx, stackPos) => {
          const isTop = stackPos === 0;
          const photo = photos[photoIdx];
          return (
            <figure
              key={photoIdx}
              className={`mgs__card${isTop ? " mgs__card--top" : ""}${drag && isTop ? " mgs__card--dragging" : ""}`}
              style={isTop ? topStyle : behindStyle(stackPos)}
              aria-hidden={!isTop}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? endDrag : undefined}
              onPointerCancel={isTop ? endDrag : undefined}
            >
              {isTop && <span className="mgs__tape" aria-hidden="true" />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mgs__img"
                src={photo.src}
                alt={t.gallery.captions[photoIdx]}
                draggable={false}
                loading={isTop ? "eager" : "lazy"}
              />
            </figure>
          );
        })}

        <button
          type="button"
          className="mgs__arrow mgs__arrow--prev"
          aria-label="Previous image"
          onClick={prev}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          className="mgs__arrow mgs__arrow--next"
          aria-label="Next image"
          onClick={next}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="mgs__meta">
        <p className="mgs__counter" aria-live="polite">
          {numberFmt.format(topIndex + 1)} / {numberFmt.format(photos.length)}
        </p>
        <div className="mgs__dots">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`mgs__dot${i === topIndex ? " is-active" : ""}`}
              aria-label={`${t.gallery.captions[i]} (${numberFmt.format(i + 1)})`}
              aria-current={i === topIndex}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <p key={topIndex} className="mgs__caption animate-fade-in">
        <span dir="auto">{t.gallery.captions[topIndex]}</span>
      </p>
      <p className="mgs__hint">
        <span dir="auto">{t.gallery.swipeHint}</span>
      </p>
    </div>
  );
}

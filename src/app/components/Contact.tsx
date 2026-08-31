"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "../providers";

export default function Contact() {
  const { t } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // فیلد هانی‌پات — برای انسان‌ها مخفی است؛ ربات‌ها آن را پر می‌کنند
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "rate-limited"
  >("idle");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const els = [titleRef.current, formRef.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      if (res.status === 429) {
        setStatus("rate-limited");
      } else if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 scroll-mt-20"
    >
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 animate-on-scroll"
      >
        {t.contact.title}
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="glass w-full max-w-md flex flex-col gap-4 p-8 rounded-3xl animate-on-scroll"
      >
        {/* فیلد هانی‌پات: از دید کاربران مخفی است، ربات‌ها آن را پر می‌کنند */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <input
          type="text"
          placeholder={t.contact.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="glass-soft rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-white/60 dark:focus:border-white/30 transition-colors"
        />
        <input
          type="email"
          placeholder={t.contact.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="glass-soft rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-white/60 dark:focus:border-white/30 transition-colors"
        />
        <textarea
          placeholder={t.contact.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="glass-soft rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-white/60 dark:focus:border-white/30 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gray-900/85 dark:bg-white/90 text-white dark:text-gray-900 font-bold rounded-lg px-4 py-3 hover:bg-gray-800 dark:hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
        >
          {status === "sending" ? t.contact.sending : t.contact.send}
        </button>

        {status === "sent" && (
          <p className="text-green-600 dark:text-green-400 text-center animate-fade-in">
            {t.contact.sent}
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 dark:text-red-400 text-center animate-fade-in">
            {t.contact.error}
          </p>
        )}
        {status === "rate-limited" && (
          <p className="text-orange-600 dark:text-orange-400 text-center animate-fade-in">
            {t.contact.tooMany}
          </p>
        )}
      </form>
    </section>
  );
}

"use client";

import { socials } from "@/data/socials";
import { useApp } from "../providers";

const icons: Record<string, React.ReactNode> = {
  YouTube: (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/>
    </svg>
  ),
  "Twitter / X": (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L0 1.2h7.7l5.3 7 5.9-7zm-1.3 19.4h2L6.5 3.3h-2.2l13.3 17.3z"/>
    </svg>
  ),
  Instagram: (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"/>
    </svg>
  ),
  Telegram: (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.9 2A10 10 0 1 0 21.9 12 10 10 0 0 0 11.9 2zm4.7 7.2-1.6 7.5c-.1.6-.5.7-.9.4l-2.6-1.9-1.2 1.2c-.1.1-.3.3-.6.3l.2-2.8 5.1-4.6c.2-.2 0-.3-.3-.1l-6.3 4-2.7-.9c-.6-.2-.6-.6.1-.9l10.6-4.1c.5-.2.9.1.7.9z"/>
    </svg>
  ),
  Discord: (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.2a18.3 18.3 0 0 0-5.6 0L8.6 3a19.8 19.8 0 0 0-4.9 1.5A20.4 20.4 0 0 0 .2 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.1 0l.5.4a12.9 12.9 0 0 1-2 1l1.3 2.1a19.9 19.9 0 0 0 6-3A20.3 20.3 0 0 0 20.3 4.4zM8.7 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm6.6 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm1.8 13H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z"/>
    </svg>
  ),
};

export default function ProfileCard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useApp();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-sm text-center relative border border-gray-200 dark:border-gray-700 shadow-2xl animate-fade-up"
      >
        {/* دکمه بستن */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* عکس پروفایل */}
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 mb-4">
          {/* مسیر عکس: public/profile.jpg */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.jpg"
            alt="Nima Hasani"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/profile.svg";
            }}
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Nima Hasani
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          {t.hero.title}
        </p>

        {/* شبکه‌های اجتماعی */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              aria-label={social.name}
              className="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: `${social.color}1a`,
                color: social.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = social.color;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${social.color}1a`;
                e.currentTarget.style.color = social.color;
              }}
            >
              {icons[social.name]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

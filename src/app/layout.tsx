import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";
import type { Language } from "@/data/translations";
import "./globals.css";
import { AppProvider, type Theme } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nima Hasani — Full-Stack / AI Web Developer",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // زبان و تم از کوکی خوانده می‌شوند تا HTML اولیه‌ی سرور از همان لحظه‌ی اول
  // درست رندر شود — بدون فلش و بدون اختلاف hydration.
  const cookieStore = await cookies();
  const savedLang = cookieStore.get("lang")?.value;
  const lang: Language = savedLang === "en" ? "en" : "fa";
  const savedTheme = cookieStore.get("theme")?.value;
  const theme: Theme = savedTheme === "light" ? "light" : "dark";
  const dir = lang === "fa" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} h-full antialiased${
        theme === "dark" ? " dark" : ""
      }`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // مهاجرت یک‌باره: اگر کاربر قبلاً انتخابش را در localStorage داشته
                // ولی کوکی نداشته باشد، کوکی را برای بازدیدهای بعدی ست می‌کنیم.
                // DOM را تغییر نمی‌دهیم تا با رندر سرور (که از کوکی آمده) تداخل نکند.
                try {
                  var lang = localStorage.getItem('lang');
                  if ((lang === 'fa' || lang === 'en') && document.cookie.indexOf('lang=') === -1) {
                    document.cookie = 'lang=' + lang + '; path=/; max-age=31536000; samesite=lax';
                  }
                  var theme = localStorage.getItem('theme');
                  if ((theme === 'light' || theme === 'dark') && document.cookie.indexOf('theme=') === -1) {
                    document.cookie = 'theme=' + theme + '; path=/; max-age=31536000; samesite=lax';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AppProvider initialLang={lang} initialTheme={theme}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

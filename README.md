# Nima Hasani — Portfolio

Personal portfolio of **Nima Hasani**, a full-stack developer. A bilingual
(Persian / English) single-page site with RTL/LTR support, dark/light theme,
and a working contact form.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, strict mode)
- **React 19**
- **Tailwind CSS v4**
- **Resend** — contact-form email delivery
- **Vazirmatn / Geist** fonts (Persian + Latin)

## Features

- Bilingual UI (فارسی / English) with automatic RTL/LTR switching
- Dark / light theme — persisted via cookies, no flash on first load
- Live clock with Jalali / Gregorian date (locale-aware)
- Scroll animations, photo gallery, project showcase
- Contact form wired to the Resend email API
- SEO: Open Graph metadata, `sitemap.xml`, `robots.txt`

## Getting Started

Requirements: **Node.js 20+** and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `npm run dev`      | Start the dev server             |
| `npm run build`    | Production build                 |
| `npm start`        | Serve the production build       |
| `npm run lint`     | Run ESLint                       |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable          | Description                                       |
| ----------------- | ------------------------------------------------- |
| `RESEND_API_KEY`  | API key from [resend.com](https://resend.com)     |
| `CONTACT_EMAIL`   | Email address that receives contact-form messages |
| `CONTACT_FROM`    | Sender address shown on the email (optional — defaults to Resend's onboarding address) |

> **Note:** by default, `CONTACT_FROM` is Resend's `onboarding@resend.dev`
> address, which only sends to the account owner's verified email. Once you
> verify your domain in Resend, set `CONTACT_FROM` to something like
> `Nima Hasani <nima@yourdomain.com>` — no code changes needed.

## Project Structure

```
src/
├── app/
│   ├── api/contact/     # Contact form API route (Resend)
│   ├── components/      # Navbar, Hero, About, Projects, ...
│   ├── layout.tsx       # Root layout (fonts, SEO, cookies)
│   └── page.tsx         # Home page (single-page portfolio)
├── config/site.ts       # Site URL + metadata (single source of truth)
└── data/                # Translations, projects, social links
```

## Configuration

- **Site URL & metadata** live in one place: `src/config/site.ts`
- **Text content** (fa/en): `src/data/translations.ts`
- **Projects**: `src/data/projects.ts` — add a project with a bilingual
  title/description, tech list, and optional demo/GitHub links

## Deployment

Deploy on **Vercel**:

1. Push the repository to GitHub / GitLab.
2. Import the project in Vercel — the Next.js preset is detected automatically.
3. Add `RESEND_API_KEY` and `CONTACT_EMAIL` in **Project → Settings →
   Environment Variables**.
4. Deploy.

If you attach a custom domain, update the `url` in `src/config/site.ts` — the
sitemap, robots.txt and Open Graph metadata will follow automatically.

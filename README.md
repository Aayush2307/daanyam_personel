# YAATRI MVP

Premium mobile-first spiritual concierge web app built with Next.js App Router, TypeScript, and Tailwind CSS.

## What is included

- Mobile-first home experience with sacred premium design system
- Language switcher (EN / हिंदी) structure with JSON dictionaries
- Plan page with success state and WhatsApp prefilled CTA
- Explore page with circuit cards
- Wallet, senior mode, and concierge chat preview screens
- Account placeholder ("Coming soon")
- Sticky bottom mobile nav
- PWA basics (manifest + service worker) with offline fallback for key pages
- Dummy data only (no backend/auth/payments)

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Custom CSS token system for colors

## Project structure

```txt
src/
  app/
    page.tsx
    plan/page.tsx
    explore/page.tsx
    wallet/page.tsx
    senior/page.tsx
    chat/page.tsx
    account/page.tsx
    globals.css
    layout.tsx
  components/yaatri/
    AppScaffold.tsx
    icons.tsx
  components/
    ServiceWorkerRegister.tsx
  data/yaatri.ts
  lib/i18n.ts
  locales/
    en.json
    hi.json
public/
  manifest.webmanifest
  sw.js
  icon.svg
```

## Beginner setup

### 1) Install Node.js

Install Node.js LTS (recommended v20+):
- https://nodejs.org/

Then check:

```bash
node -v
npm -v
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run dev server

```bash
npm run dev
```

Open: `http://localhost:3000`

### 4) Deploy to Vercel

1. Push this project to GitHub.
2. Go to https://vercel.com/new
3. Import your repository.
4. Keep defaults (Framework: Next.js).
5. Click **Deploy**.

No environment variables are required for this MVP.

## Content updates (where to edit)

- Main home content + section order: `src/components/yaatri/AppScaffold.tsx`
- Circuits/trust stats dummy data: `src/data/yaatri.ts`
- Bilingual strings: `src/locales/en.json`, `src/locales/hi.json`
- Design tokens (colors, radius, borders): `src/app/globals.css`

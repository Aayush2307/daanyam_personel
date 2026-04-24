# 🌿 Daanyam Planner

Daanyam Planner is a calm, intention-first daily planning app designed as a **Daily Sankalp + Karma ritual**.

## Features

- Daily planner with:
  - Sankalp (intention)
  - Top 3 outcomes (required before tasks)
  - Karma task list (checkbox-based)
  - Idea capture
  - Observations
  - Evening reflection (editable after 6 PM local time in UI)
  - Energy slider (1–10)
- Autosave every 5 seconds
- Timeline for recent days
- Weekly insights:
  - repeated ideas
  - incomplete tasks
  - streak count
- Email/password authentication with JWT
- PostgreSQL persistence via Prisma
- Dark mode toggle
- Subtle animation with Framer Motion

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (REST)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT + bcrypt hashing

## Project Structure

```txt
.
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/login/route.ts
│   │   │   ├── auth/register/route.ts
│   │   │   └── entries/*
│   │   ├── dashboard/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── AuthForm.tsx
│   │   ├── PlannerForm.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   └── validators.ts
│   └── types/planner.ts
├── .env.example
└── package.json
```

## Setup

### 1) Clone and install

```bash
npm install
```

### 2) Configure environment

Copy env file:

```bash
cp .env.example .env
```

Set values in `.env`:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: secure random string (32+ chars)

### 3) Create database schema

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4) Run dev server

```bash
npm run dev
```

Open: `http://localhost:3000`

## API Overview

### Auth

- `POST /api/auth/register` → `{ email, password }` → `{ token }`
- `POST /api/auth/login` → `{ email, password }` → `{ token }`

### Entries (requires `Authorization: Bearer <token>`)

- `GET /api/entries/today?date=YYYY-MM-DD`
- `PUT /api/entries/today`
- `GET /api/entries/timeline`
- `GET /api/entries/weekly-insights`
- `DELETE /api/entries/:id`

## Validation + Security

- Input validation with Zod at API boundaries
- Passwords hashed using bcrypt (12 rounds)
- JWT signed with `JWT_SECRET`
- No hardcoded secrets
- Clean JSON API errors with proper status codes

## Deployment Guide

## Deploy to Vercel + Neon/Supabase Postgres

### A) Provision PostgreSQL

1. Create project in Neon or Supabase.
2. Copy connection string.
3. Ensure SSL mode is enabled if required (`?sslmode=require`).

### B) Push schema to remote DB

Locally, set `DATABASE_URL` to hosted DB URL and run:

```bash
npx prisma migrate deploy
npx prisma generate
```

If no migrations exist in deployment flow yet, create locally first with `prisma migrate dev` and commit migration files.

### C) Deploy app on Vercel

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add environment variables in Vercel Project Settings:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Set build command (default works): `next build`
5. Deploy.

### D) Post-deploy checks

- Register a user
- Create/edit daily entry
- Verify timeline and weekly insights

## Production Notes

- Consider HttpOnly secure cookies instead of localStorage token for stricter XSS mitigation.
- Add rate limiting and lockout policy on auth routes.
- Add E2E tests (Playwright) and integration tests for API flows.


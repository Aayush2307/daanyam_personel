# Daanyam — Virtual Gaushala MVP

Ritual-first, calm digital seva experience.

This MVP ships the core loop:
- user login/register
- adopt 1 cow (auto-created)
- daily feed action (once per day)
- cow mood state (happy / low-energy / hungry)
- prosperity points
- feed real cow CTA (Razorpay order API or mock fallback)

## Stack
- Next.js (App Router + React)
- Next.js Route Handlers (Node API)
- Prisma ORM
- SQLite (default for quick local shipping)

---

## 1) Local setup (Mac Intel)

### Prerequisites
- Node.js 20+
- npm 10+

Recommended via nvm:
```bash
brew install nvm
mkdir -p ~/.nvm
export NVM_DIR="$HOME/.nvm"
source /opt/homebrew/opt/nvm/nvm.sh
nvm install 20
nvm use 20
```

### Install dependencies
```bash
npm install
```

### Configure env
```bash
cp .env.example .env
```

Set a real `JWT_SECRET` in `.env`.

### Initialize database
```bash
npx prisma generate
npx prisma migrate dev --name init_virtual_gaushala
```

### Run app
```bash
npm run dev
```

Open: http://localhost:3000

---

## 2) Core product flow (MVP)

1. Register/Login
2. Cow is auto-adopted (default name: **Gauri**)
3. Dashboard shows:
   - cow visual
   - mood
   - feed button
   - prosperity points
   - real cow seva plans
4. Feed button works once/day
5. Real-cow button calls `/api/seva/real-feed`
   - with Razorpay keys: creates real Razorpay order
   - without keys: creates mock order for testing

---

## 3) API endpoints

### Auth
- `POST /api/auth/register` body: `{ email, password }`
- `POST /api/auth/login` body: `{ email, password }`

### Virtual cow
- `GET /api/cow/status`
- `POST /api/cow/feed`

### Real-world seva
- `POST /api/seva/real-feed` body: `{ planCode: "single" | "weekly" | "monthly" }`

---

## 4) Notes on Razorpay

This MVP creates server-side orders.
Checkout UI confirmation can be added next by wiring Razorpay Checkout on the client with:
- `keyId`
- `razorpayOrderId`
- callback verification endpoint

For now, this keeps the backend clean and production-ready for payment flow extension.

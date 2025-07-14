# LogynPay

**One-Day Local Demo** – Next.js 14 + PostgreSQL + Prisma ORM + NextAuth.js + Xendit Payment Gateway

---

## 📌 What is LogynPay?

A minimal, single-day project to learn modern full-stack patterns:

- **Frontend / API** – Next.js 14 (App Router, TypeScript, Tailwind CSS)
- **Database** – PostgreSQL via Prisma ORM
- **Authentication** – NextAuth.js (Credentials provider, hashed passwords)
- **Payments** – Xendit (sandbox) for invoice generation & webhook handling

> Runs **locally only**. Perfect for quick experiments or portfolio demos.

---

## 🚀 Quick Start (5-minute setup)

### 1. Prerequisites

- Node.js ≥ 18
- PostgreSQL running locally (or Docker)
- A **Xendit sandbox account** → grab your secret key

### 2. Clone & Install

```bash
git clone https://github.com/yourname/logynpay.git
cd logynpay
npm install
```

### 3. Environment Variables

Create `.env` from `.env.example`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/logynpay"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="super-secret-jwt-key"   # openssl rand -base64 32

# Xendit (sandbox)
XENDIT_SECRET_KEY="xnd_development_..."
```

### 4. Database Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed     # seeds 1 demo user
```

### 5. Run Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 Sandbox Testing

| Flow             | How                                                                                                 |
|------------------|-----------------------------------------------------------------------------------------------------|
| Login / Register | email: `demo@mail.com` password: `123456` (seed) or create new at `/auth/register`                  |
| Create Invoice   | Dashboard → input amount → **Pay**                                                                  |
| Pay              | You'll be redirected to Xendit checkout; pick **Virtual Account** → use test numbers (`88099...`) |
| Webhook          | Server auto-updates invoice status when Xendit hits `/api/callback/xendit` (no extra setup locally) |

---

## 📁 Project Structure

```
logynpay/
├── .env                         # Semua environment variable (DATABASE_URL, NEXTAUTH_SECRET, XENDIT_SECRET_KEY, dsb.)
├── .env.example                 # Contoh env untuk tim / repo publik
├── .gitignore                   # Node_modules, .env, .next, dsb.
├── package.json
├── package-lock.json
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # TailwindCSS
├── postcss.config.mjs
├── next.config.ts               # Config Next.js (bisa kosong untuk sekarang)
├── prisma/
│   ├── schema.prisma            # Schema DB lengkap
│   └── seed.ts                  # Opsional: seed dummy user & invoice
├── public/
│   ├── favicon.ico
│   └── images/                  # Logo atau dummy image
└── src/
    ├── middleware.ts            # NextAuth route protection
    ├── lib/
    │   ├── prisma.ts            # Singleton PrismaClient
    │   ├── auth.ts              # NextAuth options (providers, callbacks, dsb.)
    │   ├── bcrypt.ts            # Helper hash/compare password
    │   ├── xendit.ts            # Inisialisasi client Xendit SDK
    │   └── utils.ts             # Helper fungsi umum
    ├── app/
    │   ├── globals.css          # Import Tailwind
    │   ├── layout.tsx           # Root layout (html, body, provider)
    │   ├── page.tsx             # Landing page (redirect ke /login kalau belum login)
    │   ├── api/
    │   │   ├── auth/
    │   │   │   └── [...nextauth]/
    │   │   │       └── route.ts # NextAuth handler
    │   │   ├── invoices/
    │   │   │   └── route.ts     # POST buat invoice (authed)
    │   │   └── callback/
    │   │       └── xendit/
    │   │           └── route.ts # POST terima webhook Xendit
    │   ├── (auth)/
    │   │   ├── layout.tsx       # Shared layout for auth pages
    │   │   ├── login/
    │   │   │   └── page.tsx     # Halaman login (/auth/login)
    │   │   └── register/
    │   │       └── page.tsx     # Halaman register (/auth/register)
    │   ├── dashboard/
    │   │   └── page.tsx         # (Protected) daftar invoice & tombol buat baru
    │   ├── invoice/
    │   │   └── [id]/
    │   │       └── page.tsx     # Detail invoice, tombol bayar
    │   └── components/
    │       ├── ui/
    │       │   ├── Button.tsx
    │       │   ├── Input.tsx
    │       │   └── Card.tsx
    │       ├── InvoiceForm.tsx  # Form jumlah & submit create invoice
    │       ├── InvoiceList.tsx  # Tabel daftar invoice
    │       └── Navbar.tsx       # Logout button & brand
```

---

## 🗂️ Database Schema (Prisma)

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String
  invoices  Invoice[]
  createdAt DateTime  @default(now())
}

model Invoice {
  id        String    @id @default(cuid())
  userId    String
  amount    Int
  status    String    @default("PENDING")  // PENDING | PAID | EXPIRED
  xenditId  String?   // Xendit invoice ID
  payments  Payment[]
  user      User      @relation(fields: [userId], references: [id])
  createdAt DateTime  @default(now())
}

model Payment {
  id        String    @id @default(cuid())
  invoiceId String
  status    String
  paidAt    DateTime?
  invoice   Invoice   @relation(fields: [invoiceId], references: [id])
}
```

---

## 🔐 Authentication

| Provider             | Details                                              |
|----------------------|------------------------------------------------------|
| **Credentials**      | email + bcrypt-hashed password                       |
| **Session**          | JWT stored in http-only cookie                       |
| **Protecting pages** | `middleware.ts` auto-redirects unauthenticated users |

---

## 💳 Payment Flow

```mermaid
sequenceDiagram
    participant U as User
    participant A as Next.js API
    participant X as Xendit
    participant DB as PostgreSQL
    
    U->>A: POST /api/invoices {amount}
    A->>X: createInvoice()
    X-->>A: checkout_url
    A->>DB: save invoice (PENDING)
    A-->>U: redirect to checkout_url
    U->>X: pay
    X->>A: POST /api/callback/xendit
    A->>DB: update invoice & payment
```

---

## 🛠️ Available Scripts

| Command                 | Description                      |
|-------------------------|----------------------------------|
| `npm run dev`           | Start dev server with hot-reload |
| `npm run build`         | Build for production             |
| `npm start`             | Run production build             |
| `npm run db:reset`      | Reset & re-seed database         |
| `npm run prisma:studio` | Open Prisma Studio (GUI DB)      |

---

## 🧩 Tech Stack

| Layer         | Tech                                             |
|---------------|--------------------------------------------------|
| Framework     | Next.js 14 (App Router, React Server Components) |
| Language      | TypeScript                                       |
| Styling       | Tailwind CSS                                     |
| ORM           | Prisma                                           |
| DB            | PostgreSQL                                       |
| Auth          | NextAuth.js v5 (beta)                            |
| Payments      | Xendit Node SDK                                  |
| Password Hash | bcryptjs                                         |
| Dev Tools     | ESLint, Prettier (optional)                      |

---

## 🧼 Code Style & Linting

```bash
npm run lint
npm run format   # if Prettier configured
```

---

## 🚀 Deployment Roadmap (beyond local)

1. **Vercel** – zero-config for Next.js
2. **Neon.tech / Supabase** – managed PostgreSQL
3. Update `NEXTAUTH_URL` & `DATABASE_URL` envs
4. Add Xendit webhook URL (Vercel domain) in Xendit dashboard

---

## 📄 License

MIT – feel free to fork & experiment.

---

## 🤝 Contributing

Issues & PRs welcome. Keep it minimal; this repo is intentionally lightweight.
# TechCo Website — Setup Instructions

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or pnpm

---

## 1. Install Dependencies

```bash
npm install
```

## 2. Environment Variables

```bash
cp .env.example .env
# Edit .env with your values
```

Required fields:
- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — min 32 chars (`openssl rand -hex 32`)
- `NEXT_PUBLIC_APP_URL` — your domain (e.g. `https://techco.com`)
- SMTP fields for email notifications

## 3. Database Setup

```bash
# Run migrations
npm run prisma:migrate

# Generate client
npm run prisma:generate

# Seed sample data
npm run prisma:seed
```

Seed creates:
- Admin user: `admin@techco.com` / `admin123456`
- 6 services, 4 projects, 4 team members, 3 blog posts

## 4. Development

```bash
npm run dev
```

- Website: http://localhost:3000
- Turkish: http://localhost:3000/tr
- English:  http://localhost:3000/en
- Admin:    http://localhost:3000/admin

## 5. Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Public website (i18n)
│   │   ├── page.tsx       # Home
│   │   ├── services/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── blog/
│   │   └── contact/
│   ├── admin/             # Admin panel
│   │   ├── page.tsx       # React Admin app
│   │   └── login/
│   └── api/
│       ├── contact/       # Contact form
│       ├── quote/         # Quote requests
│       ├── auth/          # Login/logout/me
│       ├── media/         # File uploads
│       └── admin/         # CRUD API for admin
├── components/
│   ├── ui/                # Base UI (Button, Badge, Card…)
│   ├── layout/            # Header, Footer, WhatsApp
│   ├── sections/          # Hero, Services, Projects…
│   └── admin/             # React Admin components
├── i18n/                  # next-intl config
├── lib/                   # prisma, auth, email, utils
└── types/
messages/
├── tr.json
└── en.json
prisma/
├── schema.prisma
└── seed.ts
```

---

## Admin Panel

URL: `/admin`
Login: `/admin/login`

Resources managed:
- Services (CRUD + multilingual)
- Projects (CRUD + multilingual)
- Blog Posts (CRUD + multilingual)
- Team Members (CRUD + multilingual)
- Contact Messages (read + status update)
- Quote Requests (read + status update)

Dashboard shows real-time stats.

---

## Adding New Content

### New Service

1. Go to Admin → Services → Create
2. Fill slug, icon (Lucide name), order
3. Add translations for TR and EN
4. Save

### New Blog Post

1. Go to Admin → Blog Posts → Create
2. Content is HTML (you can paste from a rich text editor)
3. Set `isPublished: true` to make it visible

---

## Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Framework   | Next.js 15 (App Router) |
| Styling     | Tailwind CSS v3     |
| Animations  | Framer Motion       |
| Admin       | React Admin v5      |
| Database    | PostgreSQL          |
| ORM         | Prisma              |
| Auth        | iron-session        |
| i18n        | next-intl           |
| Email       | Nodemailer          |
| Images      | Sharp + Next/Image  |

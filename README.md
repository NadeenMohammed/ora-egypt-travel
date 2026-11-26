# ORA TRAVEL — Full-Stack React + Prisma + Admin Dashboard

A complete international luxury travel platform for **ORA TRAVEL** built with **React 18, Vite, Tailwind CSS, Framer Motion, Express API, and Prisma ORM (PostgreSQL)**, featuring a **standalone `/admin` dashboard**.

## Features Included
- **Official Brand Identity:** Uses your uploaded ORA TRAVEL logo (`/public/logo.png`, `/public/favicon.png`) and extracted brand colors (`#102355` Royal Navy, `#D2A058` Solar Gold, `#B88346` Warm Bronze, `#FAF8F4` Ivory Cream).
- **Cinematic Hero Slider:** Multi-slide Ken Burns zoom, smooth crossfade transitions, animated progress indicators, pause-on-hover, and integrated quick tour search.
- **Smooth Animations:** Framer Motion page transitions, scroll-reveal sections, and interactive card hover states.
- **Prisma Database & Full Form Recording:**
  - Booking Inquiry Form (`POST /api/forms/booking` -> `BookingInquiry` table)
  - Contact Us Form (`POST /api/forms/contact` -> `ContactMessage` table)
  - Newsletter Subscription Form (`POST /api/forms/newsletter` -> `NewsletterSubscriber` table)
- **Standalone `/admin` Dashboard:**
  - JWT-protected Admin Login (separate layout from public site)
  - Overview KPI stats & recent submissions
  - Bookings management (status updates, delete, CSV export)
  - Contact messages inbox (status updates, delete, CSV export)
  - Newsletter subscribers list & CSV export
  - Full CRUD for Tours, Destinations, Blog Articles, and live Site Settings

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and add your PostgreSQL `DATABASE_URL` (you can get a free PostgreSQL database from [Neon](https://neon.tech) or [Supabase](https://supabase.com)):
   ```bash
   cp .env.example .env
   ```
3. Push the Prisma schema & seed initial data + admin account:
   ```bash
   npx prisma generate
   npm run db:push
   npm run db:seed
   ```
4. Start both the API server and React frontend:
   ```bash
   npm run dev:all
   ```
5. Open:
   - Public Website: `http://localhost:5173`
   - Standalone Admin Dashboard: `http://localhost:5173/admin`

## Deploy to GitHub & Vercel
1. Push this project folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ORA TRAVEL Full-Stack Website + Prisma + /admin"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Import the repository on [vercel.com](https://vercel.com).
3. In Vercel **Project Settings → Environment Variables**, add:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Click **Deploy**. `vercel.json` routes `/api/*` to the Express serverless function (`api/index.js`) and all other paths to the React SPA (`index.html`).
5. Run `npx prisma db push && npm run db:seed` once against your production `DATABASE_URL` to create the tables and your admin login.

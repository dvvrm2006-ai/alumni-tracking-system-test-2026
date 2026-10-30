# AlumniConnect — Alumni Tracking System

A production-ready MERN application built for Smart India Hackathon (SIH),
connecting an institution's students, alumni, and administrators on one
platform.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Deployment Guide](#deployment-guide)
- [Future Scope](#future-scope)
- [Contributors](#contributors)
- [License](#license)

---

## Problem Statement

Institutions lose touch with the majority of their graduates within a few
years of them leaving. What remains is a patchwork of outdated spreadsheets,
informal WhatsApp groups, and manual re-collection of contact details every
placement season — with no searchable record of who graduated when, what
they do now, or how to reach them for mentorship, referrals, or events.

## Solution

AlumniConnect gives every student and graduate one verified profile, a
searchable alumni directory with real filters (company, branch, graduation
year, location, skills, experience), an events system with actual
registration tracking, and an admin dashboard giving the institution a
single source of truth for engagement across the whole network.

## Features

- **Authentication** — JWT-based, httpOnly cookies, bcrypt password hashing,
  rate-limited login/register endpoints.
- **Profile Management** — full editable profile (photo, education,
  company, bio, skills, social links) via a dedicated view/edit flow.
- **Alumni Directory** — debounced live search, multi-field filters, four
  sort modes, pagination, skeleton loading states.
- **Events** — browse/search/filter/sort, registration with duplicate,
  capacity, and deadline guards, a personal "My Events" list.
- **Admin Dashboard** — platform stats, user management (suspend/delete),
  full event CRUD, registration viewer, and simple analytics.
- **Production polish** — toast notifications, page transitions, 401/403/404
  pages, centralized error handling, security middleware (helmet, rate
  limiting, NoSQL-injection sanitization).

## Technology Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, React Hook Form,
Axios, Framer Motion, Lucide React, react-hot-toast

**Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs, dotenv, cors,
cookie-parser, helmet, express-rate-limit, express-mongo-sanitize

**Database:** MongoDB Atlas

**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Folder Structure

See [`docs/FOLDER_STRUCTURE.md`](./docs/FOLDER_STRUCTURE.md) for the full
annotated breakdown. Summary:

```
alumni-tracking-system/
├── client/     React frontend
├── server/     Express backend
├── docs/       Architecture, DB schema, API docs, flows, testing, SIH kit
└── README.md   You are here
```

## Installation

### Prerequisites
Node.js 18+, a MongoDB Atlas connection string, Git.

### Backend

```bash
cd server
npm install
cp .env.example .env
# edit .env with your real MongoDB URI and a JWT secret
npm run dev
```

Server runs on `http://localhost:5000`.

### Frontend

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`. Start the backend first.

### Creating an admin user

There's no admin signup flow by design. Register a normal account, then in
MongoDB Atlas manually set that user's `role` field to `"admin"`. Log back
in and the Admin Panel button appears on the Dashboard.

## Environment Variables

### `server/.env`

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `NODE_ENV` | `development` or `production` |

### `client/.env` (or `.env.production` when deployed)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend base URL, e.g. `http://localhost:5000/api` |

## API Endpoints

Full documentation with request/response shapes:
[`docs/API_DOCUMENTATION.md`](./docs/API_DOCUMENTATION.md)

Quick reference:

| Domain | Base path | Notes |
|---|---|---|
| Auth | `/api/auth` | register, login, logout, me |
| Profile | `/api/profile` | get/update own profile |
| Alumni | `/api/alumni` | list, search, single profile |
| Events | `/api/events` | list, detail, my-events, register, admin CRUD |
| Admin | `/api/admin` | stats, user management |

## Screenshots

> Placeholders — replace with real screenshots before submission.

| Landing Page | Alumni Directory | Events | Admin Dashboard |
|---|---|---|---|
| `docs/screenshots/landing.png` | `docs/screenshots/directory.png` | `docs/screenshots/events.png` | `docs/screenshots/admin.png` |

## Deployment Guide

### Database — MongoDB Atlas
1. Create a free cluster, add a database user, and whitelist your IP (or
   `0.0.0.0/0` for simplicity during a hackathon demo).
2. Copy the connection string into `MONGO_URI`.

### Backend — Render
1. Push this repo to GitHub.
2. In Render, create a new Web Service from the repo, root directory
   `server` (a `render.yaml` blueprint is already included).
3. Set the environment variables listed above (`MONGO_URI`, `JWT_SECRET`,
   `CLIENT_URL` = your deployed Vercel URL, `NODE_ENV=production`).
4. Deploy. Note the resulting `https://*.onrender.com` URL.

### Frontend — Vercel
1. Import the repo into Vercel, root directory `client`.
2. Set `VITE_API_URL` to `https://<your-render-service>.onrender.com/api`.
3. Deploy. `vercel.json` already handles SPA routing so deep links don't 404.
4. Update the backend's `CLIENT_URL` env var to this Vercel URL and redeploy
   the backend so CORS allows it.

## Future Scope

- Real profile photo storage via Cloudinary
- Direct messaging between alumni (Connect/Contact are placeholders today)
- Mentorship matching and a job referral board
- Event reminder notifications
- Multi-institution (multi-tenant) support

## Contributors

- Project author — B.Tech CSE (AI & ML), built for Smart India Hackathon

## License

This project is submitted for Smart India Hackathon evaluation. Add a
license (e.g. MIT) here if open-sourcing after the event.

---

**More documentation:** [Architecture](./docs/ARCHITECTURE.md) ·
[Database Schema](./docs/DATABASE_SCHEMA.md) ·
[User Flow](./docs/USER_FLOW.md) · [Admin Flow](./docs/ADMIN_FLOW.md) ·
[Testing Checklist](./docs/TESTING_CHECKLIST.md) ·
[SIH Presentation Kit](./docs/SIH_PRESENTATION.md)

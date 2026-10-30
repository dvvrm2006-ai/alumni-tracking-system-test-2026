# Architecture — Alumni Tracking System

## High-level overview

```
┌───────────────────────┐         HTTPS (JSON + httpOnly cookie)        ┌────────────────────────┐
│   React Client (Vite) │ ─────────────────────────────────────────────▶│   Express API Server    │
│   Deployed: Vercel     │◀───────────────────────────────────────────── │   Deployed: Render      │
└───────────────────────┘                                                └────────────┬───────────┘
                                                                                       │
                                                                                       │ Mongoose ODM
                                                                                       ▼
                                                                            ┌────────────────────┐
                                                                            │   MongoDB Atlas     │
                                                                            └────────────────────┘
```

## Why a decoupled MERN architecture

The client and server are two independently deployable apps that only talk
over a REST API. This means:

- The frontend can be redeployed (new UI, new pages) without touching the
  backend, and vice versa.
- Each side scales and is monitored independently in production (Vercel edge
  network for the static frontend, a single Render web service for the API).
- It maps directly onto how the project was actually built milestone by
  milestone — auth, profile, directory, events, and admin were each added as
  isolated modules without needing to touch the others.

## Backend layering

```
Request
  |
  v
Middleware (helmet -> cors -> json parser -> cookie parser -> mongo-sanitize -> rate limiter*)
  |
  v
Route file (routes/*.js)         - maps a URL + method to a controller function
  |
  v
Auth middleware (verifyToken, verifyAdmin) - runs only on routes that need it
  |
  v
Controller (controllers/*.js)    - request/response handling, calls the model
  |
  v
Model (models/*.js)              - Mongoose schema, validation, hooks
  |
  v
MongoDB Atlas

* rate limiter only applies to /api/auth/login and /api/auth/register
```

Each domain (auth, profile, alumni, events, admin) has its own controller and
route file. Shared logic (query building for search/filter/sort) lives in
`utils/`, so controllers stay thin.

## Frontend layering

```
main.jsx
  -> App.jsx (AuthProvider, BrowserRouter, Toaster, AnimatePresence)
       -> Routes (each wrapped in ProtectedRoute or AdminRoute where needed)
            -> Pages (pages/*.jsx)         - one per route, composes components
                 -> Components (components/<domain>/*.jsx)  - reusable UI pieces
                      -> Services (services/*.js)  - thin Axios wrappers per domain
```

`AuthContext` is the single source of truth for "who is logged in" - it
checks `/auth/me` once on load and exposes `login`, `register`, `logout` to
the rest of the app. Route guards (`ProtectedRoute`, `AdminRoute`) read from
it rather than each page managing its own auth check.

## Authentication flow

1. User submits the login/register form.
2. Backend verifies credentials (bcrypt-hashed password), signs a JWT, and
   sets it as an httpOnly cookie (not readable by JavaScript - protects
   against XSS token theft).
3. Every subsequent request automatically includes the cookie
   (`withCredentials: true`).
4. `verifyToken` middleware decodes the cookie on protected routes;
   `verifyAdmin` additionally checks the user's role in the database.
5. A 401 mid-session (expired/invalid token) is caught by an Axios
   interceptor, which redirects to `/login` with a toast notification.

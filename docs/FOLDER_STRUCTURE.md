# Folder Structure — Alumni Tracking System

```
alumni-tracking-system/
├── client/                          React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/               Admin dashboard UI (sidebar, tables, stat cards, modal)
│   │   │   ├── alumni/              Directory UI (search, filters, card, pagination)
│   │   │   ├── auth/                Route guards (ProtectedRoute, AdminRoute)
│   │   │   ├── common/              Cross-domain UI (LoadingSpinner, PageTransition)
│   │   │   ├── events/              Event UI (card, form, timeline, registration button)
│   │   │   ├── landing/             Public landing page sections
│   │   │   ├── layout/              Navbar, Footer (shared on every page)
│   │   │   └── profile/             Profile view/edit building blocks (reused by
│   │   │                            both "my profile" and "view alumni" pages)
│   │   ├── context/                 AuthContext — single source of truth for the logged-in user
│   │   ├── hooks/                   useDebounce, useCountUp
│   │   ├── pages/                   One file per route; composes components
│   │   │   └── admin/               Admin-only pages
│   │   ├── services/                Thin Axios wrappers, one file per API domain
│   │   ├── App.jsx                  Routing, providers, page transitions
│   │   ├── main.jsx                 Entry point
│   │   └── index.css                Tailwind + font imports
│   ├── vercel.json                  SPA rewrite rules for deployment
│   ├── vite.config.js, tailwind.config.js, postcss.config.js, jsconfig.json
│   └── package.json
│
├── server/                          Express backend
│   ├── config/db.js                 MongoDB Atlas connection
│   ├── controllers/                 Request/response logic, one file per domain
│   ├── middleware/                  verifyToken, verifyAdmin, notFound, errorHandler
│   ├── models/                      User.js, Event.js (Mongoose schemas)
│   ├── routes/                      URL -> controller mappings, one file per domain
│   ├── utils/                       Shared helpers (query building, validation, JWT signing)
│   ├── render.yaml                  Render deployment blueprint
│   ├── server.js                    App entry point, middleware pipeline
│   └── package.json
│
├── docs/                            This documentation set
├── README.md
└── .gitignore
```

## Why this shape

Every domain (auth, profile, alumni, events, admin) follows the exact same
pattern on both sides: a controller/route pair on the backend, a
service/page/component set on the frontend. Once you understand one domain,
you understand the shape of all of them — there's no special-cased module.

Shared logic is deliberately pulled out rather than duplicated per domain:
`utils/alumniQueryHelpers.js` and `utils/eventQueryHelpers.js` both do
match/sort building for their respective list endpoints; `components/profile/*`
is reused by both the "my profile" and "view alumni profile" pages instead of
having two parallel profile-rendering implementations.

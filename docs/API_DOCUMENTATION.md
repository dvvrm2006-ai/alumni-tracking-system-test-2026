# API Documentation — Alumni Tracking System

Base URL (local): `http://localhost:5000/api`
Base URL (production): `https://<your-render-service>.onrender.com/api`

All responses follow one consistent shape:

```json
{ "success": true, "data": { /* ... */ } }
{ "success": false, "message": "Human-readable error", "errors": ["optional field-level errors"] }
```

Authentication is via an **httpOnly JWT cookie** (`token`), set automatically on
login/register. No `Authorization` header is used — the browser sends the
cookie with every request as long as `withCredentials: true` is set (already
configured in the frontend's Axios instance).

---

## Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | Public | Create an account. Body: `name, email, password, role?`. Sets the JWT cookie. |
| POST | `/login` | Public | Log in. Body: `email, password`. Sets the JWT cookie. Rate-limited (20 req / 15 min). |
| POST | `/logout` | Public | Clears the JWT cookie. |
| GET | `/me` | Required | Returns the logged-in user's full document. |

## Profile — `/api/profile`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Required | Returns the logged-in user's profile. |
| PUT | `/` | Required | Updates editable profile fields (phone, company, jobTitle, experience, location, bio, skills, linkedinUrl, githubUrl, portfolioUrl, profilePhoto). Email/role/password cannot be changed here. |

## Alumni Directory — `/api/alumni`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Required | Paginated list. Query: `company, branch, graduationYear, location, skills, experience, sort, page, limit`. |
| GET | `/search` | Required | Free-text search. Query: `q, sort, page, limit`. |
| GET | `/:id` | Required | Single alumni profile. |

`sort` values: `newest`, `oldest`, `alphabetical`, `experienced`.

## Events — `/api/events`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Required | List events. Query: `category, eventType, timeframe (upcoming/past), q, sort`. |
| GET | `/my-events` | Required | Events the logged-in user is registered for. |
| GET | `/:id` | Required | Single event, with registered users populated. |
| POST | `/` | Admin only | Create an event. |
| PUT | `/:id` | Admin only | Update an event. |
| DELETE | `/:id` | Admin only | Delete an event. |
| POST | `/register/:id` | Required | Register for an event. Blocks duplicates, full events, and closed deadlines. |

`sort` values: `newest`, `oldest`, `date`.

## Admin — `/api/admin`

All routes require `role: "admin"`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats` | Dashboard totals: users, alumni, events, upcoming events, registrations. |
| GET | `/users` | Full user list for the admin Users table. |
| PUT | `/users/:id/status` | Set `accountStatus` to `active` or `suspended`. |
| DELETE | `/users/:id` | Delete a user. |

## Misc

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/protected/dashboard-data` | Required | Example route demonstrating the JWT middleware. |
| GET | `/health` | Public | Health check for uptime monitors. |

---

## Error status codes used throughout

| Code | Meaning |
|---|---|
| 400 | Validation failed (bad input) |
| 401 | Missing/invalid/expired token |
| 403 | Valid token, insufficient role (admin-only route) |
| 404 | Resource or route not found |
| 409 | Conflict (duplicate email, duplicate event registration) |
| 500 | Unhandled server error |

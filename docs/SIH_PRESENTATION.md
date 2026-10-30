# SIH Presentation Kit — Alumni Tracking System

## 2-Minute Elevator Pitch

> Every institution loses touch with most of its graduates within a few
> years. What's left is a scattered mess of WhatsApp groups, outdated
> spreadsheets, and an alumni cell that manually re-collects the same
> contact details every year.
>
> AlumniConnect is a single platform that replaces all of that. Students and
> graduates get one verified profile each. A searchable directory lets
> anyone find alumni by company, skill, branch, or location in seconds
> instead of asking around. An events module lets the institution run
> reunions and webinars with real registration tracking, not a Google Form
> nobody checks. And an admin dashboard gives the institution one place to
> see engagement across the whole network — total users, upcoming events,
> registration numbers — instead of guessing.
>
> It's built on the MERN stack, deployed on Vercel and Render, with
> production-grade security: hashed passwords, httpOnly JWT cookies, rate
> limiting on login, and role-based access control enforced on the server,
> not just hidden in the UI.

## 5-Minute Demo Script

1. **(30s) Landing page** — show the polished public landing page. Mention
   it's built to feel like a modern SaaS product, not a college project.
2. **(45s) Register + Login** — create a new account live. Point out the
   redirect to Dashboard and that a returning user typing `/login` while
   already logged in gets bounced straight back in.
3. **(45s) Profile** — open Profile, click Edit, change a field (e.g. add a
   skill), save, show it reflected instantly.
4. **(60s) Alumni Directory** — type a search term live (show the debounce —
   it doesn't fire on every keystroke), apply a filter, change the sort to
   "Most Experienced", click into a profile.
5. **(60s) Events** — browse events, open one, show the registration
   timeline, register live, show the seat count decrement and the success
   toast.
6. **(45s) Admin Dashboard** — log in as an admin (or switch accounts), show
   the stat cards, open the Users table, suspend a test account live, open
   the Events table, show "View Registrations".
7. **(15s) Close** — mention deployment (Vercel + Render + Atlas) and that
   the whole thing was built and shipped in 7 focused milestones.

## Key Innovation Points

- **One verified profile, reused everywhere** — the same profile components
  render a user's own profile, another alumnus's directory profile, and
  (indirectly) the registration list on an event. No duplicated
  profile-rendering code anywhere in the app.
- **Free-text experience parsing** — rather than forcing users into a rigid
  "years of experience" dropdown, the backend parses a leading number out of
  a natural-language field ("2 years", "6 months") via a MongoDB aggregation
  stage, so both the filter and the "Most Experienced" sort work without
  friction for the user.
- **Server-enforced role security, not UI-only** — every admin action is
  independently guarded server-side (`verifyAdmin`), so hiding a button in
  the UI is never the only thing standing between a regular user and an
  admin action.
- **Debounced, live search** across both the alumni directory and events,
  instead of a submit-button search box.

## Technical Architecture Explanation

Decoupled MERN: React (Vite) frontend on Vercel, Express/Node backend on
Render, MongoDB Atlas for data. Authentication uses httpOnly JWT cookies
(not localStorage — immune to XSS token theft). Every domain — auth,
profile, alumni directory, events, admin — follows the same layered pattern
on both sides (route -> controller -> model on the backend; page ->
component -> service on the frontend), which is why the system was buildable
incrementally across seven milestones without earlier modules breaking.

## Challenges Faced

- **Keeping "Most Experienced" sorting fair** without forcing a rigid input
  format — solved with an aggregation pipeline that extracts a leading
  number from free text.
- **Avoiding duplicated profile UI** across three different contexts (own
  profile, alumni directory profile, admin registration list) — solved by
  designing the profile components to be data-shape-agnostic from the start.
- **Balancing admin power with security** — every write operation an admin
  can perform through the UI is also independently locked down at the API
  level, so the security model doesn't rely on nobody finding the URL.

## Future Enhancements

- Real photo upload via Cloudinary (currently a structured placeholder)
- Direct messaging between alumni (Connect/Contact buttons are placeholders today)
- Mentorship matching and a job referral board
- Push/email notifications for event reminders and registration confirmations
- Admin-configurable settings (the Settings page is currently a placeholder)

## Possible Judge Questions & Answers

**Q: Why cookies instead of localStorage for the JWT?**
A: httpOnly cookies can't be read by JavaScript, which closes off the most
common XSS-based token theft vector. localStorage is readable by any script
running on the page, including an injected one.

**Q: How do you prevent duplicate event registrations or overbooking?**
A: The registration endpoint checks the `registeredUsers` array for the
current user's ID before allowing a new registration, and checks
`registeredUsers.length` against `maximumParticipants` before allowing any
registration at all — both server-side, not just disabled buttons.

**Q: What stops a regular user from hitting an admin API endpoint directly?**
A: `verifyAdmin` middleware runs on every admin route and every event
write route. It independently looks up the user's role in the database on
every request — it doesn't trust anything the client sends about the user's
role.

**Q: How does the "Most Experienced" sort actually work under the hood?**
A: Experience is stored as free text. A MongoDB aggregation `$addFields`
stage extracts the leading number (e.g. "3" from "3 years") into a computed
field, which is then used for sorting and for the minimum-experience filter
— without ever changing what the user types.

**Q: Is this scalable beyond one institution?**
A: The current schema is single-tenant (one shared user/event collection).
Multi-institution support would mean adding an `institutionId` field to
`User` and `Event` and scoping every query by it — a schema extension, not
an architecture rewrite.

# Admin Flow — Alumni Tracking System

```
                    +---------------+
                    |     Login      |
                    | (role: admin)  |
                    +-------+-------+
                            v
                    +---------------+
                    |   Dashboard    |
                    | "Admin Panel"  |
                    +-------+-------+
                            v
                    +---------------+
                    |  Admin Layout  |
                    |    (sidebar)   |
                    +-------+-------+
     +----------+---------+---------+---------+----------+
     v          v         v         v         v          v
 Dashboard    Users     Alumni    Events    Reports    Settings
   (stats)  (table)   (-> link   (table +   (progress  (placeholder)
                       to main    create/     bars)
                       directory) edit/
                                  delete/
                                  view regs)
```

## Step-by-step

1. **Admin access is server-enforced, not just hidden UI.** The "Admin
   Panel" button only *renders* for `role: "admin"`, but every `/api/admin/*`
   and every event write endpoint (`POST/PUT/DELETE /api/events`) also
   checks the role server-side via `verifyAdmin`. A non-admin user cannot
   reach admin functionality even by calling the API directly.
2. **Dashboard** - five stat cards: total users, total alumni, total events,
   upcoming events, total registrations.
3. **Users** - table with profile photo, name, email, role, and account
   status. Actions: suspend/reactivate (toggles `accountStatus`), delete.
4. **Alumni** - deliberately does not duplicate the alumni table; it links
   into the existing `/alumni` directory so there's one source of truth for
   alumni data.
5. **Events** - table with edit (opens `/events/create?id=<id>`, the same
   form component in edit mode), delete (with a confirm prompt), and
   "View Registrations" (opens a modal listing everyone registered, fetched
   with populated user details).
6. **Reports** - plain progress-bar stat cards (alumni share of users,
   upcoming vs. total events, average registrations per event) - no charting
   library, per the brief.
7. **Settings** - placeholder for a future milestone.

## Non-admin attempting to access `/admin/*`

```
Non-admin user -> navigates to /admin/users
       v
AdminRoute checks user.role !== 'admin'
       v
Redirected to /403 (Forbidden page)
```

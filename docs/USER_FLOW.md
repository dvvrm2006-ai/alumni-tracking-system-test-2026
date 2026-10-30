# User Flow — Alumni Tracking System

```
                              +---------------+
                              |  Landing Page  |
                              +-------+-------+
                     +----------------+----------------+
                     v                                 v
              +-------------+                  +-------------+
              |   Register   |                  |    Login     |
              +------+------+                  +------+------+
                     +----------------+----------------+
                                      v
                              +---------------+
                              |   Dashboard    |
                              +-------+-------+
        +---------------+------------+------------+---------------+
        v               v            v            v               v
 +-------------+ +-------------+ +---------+ +-----------+ +--------------+
 | View Profile | |   Browse     | | Browse  | | My Events | | Admin Panel   |
 |              | |  Directory   | | Events  | |           | | (admins only) |
 +------+------+ +------+------+ +----+----+ +-----------+ +--------------+
        v               v             v
 +-------------+ +-------------+ +--------------+
 | Edit Profile | | View Alumni  | | Event Details |
 |              | |   Profile    | |  -> Register  |
 +-------------+ +-------------+ +--------------+
```

## Step-by-step

1. **Landing page** - public, unauthenticated. Two entry points: Register or
   Login.
2. **Register / Login** - on success, a JWT is set as an httpOnly cookie and
   the user lands on `/dashboard`. Already-logged-in users hitting
   `/login` or `/register` are redirected straight to the dashboard.
3. **Dashboard** - the hub. Shows the user's name and links out to every
   feature area.
4. **Profile** - view own profile -> Edit Profile (React Hook Form, all
   fields except email are editable) -> saves and returns to the view.
5. **Alumni Directory** - search (debounced), filter sidebar, sort dropdown
   -> click a card's "View Profile" -> full profile view (reuses the same
   components as the user's own profile page) with a placeholder Connect
   button.
6. **Events** - browse/search/filter -> Event Details -> Register button
   (disabled once full, past deadline, or already registered) -> "My Events"
   shows everything the user has registered for.
7. **Admin Panel** - only visible/reachable for `role: "admin"` users; a
   normal user hitting an `/admin/*` URL directly is redirected to `/403`.

## Session handling

If a session expires mid-use (JWT invalid/expired), any API call that
returns 401 triggers a toast ("Your session has expired") and an automatic
redirect to `/login` - the user is never left staring at a silently broken
page.

# Manual Testing Checklist — Alumni Tracking System

Run through this before any demo or deployment. Check off each item.

## Registration
- [ ] Register with valid name/email/password -> redirected to Dashboard, JWT cookie set
- [ ] Register with an already-used email -> 409 error shown, no duplicate account created
- [ ] Register with an invalid email format -> validation error shown, no request succeeds
- [ ] Register with a password under 6 characters -> validation error shown
- [ ] Register with a missing required field -> validation error shown, no server crash

## Login
- [ ] Login with correct credentials -> redirected to Dashboard
- [ ] Login with wrong password -> generic "Invalid email or password" (does not reveal which field is wrong)
- [ ] Login with a non-existent email -> same generic error message
- [ ] Already-logged-in user visiting `/login` -> redirected straight to Dashboard
- [ ] 20+ rapid login attempts in 15 minutes -> rate limiter blocks further attempts

## Logout
- [ ] Logout clears the session -> visiting `/dashboard` afterward redirects to `/login`
- [ ] Logout from Dashboard button works and shows a confirmation

## Profile Update
- [ ] View own profile -> all saved fields display correctly
- [ ] Edit Profile -> change bio, skills, links -> Save -> changes reflected immediately on the profile page
- [ ] Attempt to submit a bio over 500 characters -> validation error shown
- [ ] Attempt an invalid URL in LinkedIn/GitHub/Portfolio -> validation error shown
- [ ] Upload a new profile photo -> preview updates immediately

## Alumni Search & Directory
- [ ] Directory loads with skeleton loaders, then real data
- [ ] Typing in search live-filters results after a short debounce delay
- [ ] Search matches on name, company, skill, branch, and location
- [ ] Filter sidebar (company/branch/year/location/skills/experience) narrows results correctly
- [ ] Clearing filters restores the full list
- [ ] Sort dropdown (Newest/Oldest/Alphabetical/Most Experienced) changes result order
- [ ] Pagination moves between pages without errors
- [ ] Searching for something with zero matches shows the Empty State

## View Alumni Profile
- [ ] Clicking "View Profile" on a card opens the correct alumni's detail page
- [ ] About, Skills, Education, and Social Links render correctly
- [ ] "Back to Directory" returns to the directory (with prior filters intact or reset, as designed)
- [ ] Contact button is visibly disabled/placeholder

## Events
- [ ] Events page loads with skeleton loaders, then real data
- [ ] Search, category/type filters, and Upcoming/Past toggle all work
- [ ] Sort (Newest/Oldest/Date) changes order correctly
- [ ] Event card shows correct remaining seat count
- [ ] Event Details page timeline shows registration deadline, start, and end correctly

## Event Registration
- [ ] Registering for an open event succeeds and shows a success toast
- [ ] Registering twice for the same event is blocked with a clear message
- [ ] Registering for a fully-booked event is blocked
- [ ] Registering after the registration deadline is blocked
- [ ] "My Events" shows every event the user registered for

## Admin Login & Access Control
- [ ] Logging in as a `role: "admin"` user shows the "Admin Panel" button on Dashboard
- [ ] Logging in as a non-admin does NOT show the Admin Panel button
- [ ] A non-admin manually navigating to `/admin` is redirected to `/403`
- [ ] An unauthenticated visitor navigating to `/admin` is redirected to `/login`
- [ ] Calling an admin API endpoint directly (e.g. via Postman) without an admin token returns 403

## Admin CRUD Operations
- [ ] Admin Dashboard stat cards show accurate counts
- [ ] Admin Users table lists every user; suspend/reactivate toggles status correctly
- [ ] Admin deleting a user removes them from the list and the database
- [ ] Admin creating an event via "Create Event" appears immediately in the Events table
- [ ] Admin editing an event pre-fills the form correctly and saves changes
- [ ] Admin deleting an event removes it from the table and from the public Events page
- [ ] "View Registrations" modal shows the correct list of registered users for that event

## Cross-cutting
- [ ] Refreshing the browser on any deep route (e.g. `/alumni/abc123`) does not 404 (Vercel rewrite works)
- [ ] All pages are usable on a mobile-width viewport
- [ ] Expired/invalid session redirects to `/login` with a toast, from any page
- [ ] Direct URL access to a nonexistent route shows the 404 page

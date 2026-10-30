# Database Schema — Alumni Tracking System

MongoDB Atlas, two collections: `users` and `events`.

## ER Diagram (ASCII)

```
┌─────────────────────────────┐          ┌──────────────────────────────┐
│            User             │          │            Event             │
├─────────────────────────────┤          ├──────────────────────────────┤
│ _id            ObjectId PK  │◀───┐     │ _id              ObjectId PK │
│ name           String       │    │     │ title            String     │
│ email          String  (uq) │    │     │ description      String     │
│ password       String  (hid)│    │     │ category         String     │
│ role           enum         │    │     │ eventType        enum       │
│ accountStatus  enum         │    │     │ eventDate        Date       │
│ createdAt      Date         │    │     │ startTime        String     │
│ profilePhoto   String       │    │     │ endTime          String     │
│ phone          String       │    │     │ venue            String     │
│ collegeName    String       │    │     │ organizer        String     │
│ branch         String       │    │     │ image            String     │
│ graduationYear Number       │    │     │ registrationDeadline Date   │
│ currentCompany String       │    │     │ maximumParticipants Number  │
│ jobTitle       String       │    │     │ registeredUsers  [ObjectId] │────┐
│ experience     String       │    │     │ createdBy        ObjectId   │────┤
│ location       String       │    │     │ status           enum      │    │
│ bio            String       │    │     │ createdAt        Date      │    │
│ skills         [String]     │    │     └──────────────────────────────┘    │
│ linkedinUrl    String       │    │                                         │
│ githubUrl      String       │    └─────────────────────────────────────────┘
│ portfolioUrl   String       │      (registeredUsers[] and createdBy both
└─────────────────────────────┘       reference User._id — a many-to-many
                                       between Event and User via
                                       registeredUsers, and a one-to-many
                                       Event->creator via createdBy)
```

## Relationships

- **User → Event (createdBy):** one-to-many. Every event has exactly one
  creator (an admin). Stored as a single `ObjectId` ref.
- **User ↔ Event (registeredUsers):** many-to-many. An event has many
  registrants; a user can register for many events. Stored as an array of
  `ObjectId` refs on the `Event` document (embedding the reference array is
  simpler than a join collection at this scale, and `.populate()` resolves
  it on demand for the admin "View Registrations" view).

## Design notes

- **`password` has `select: false`** — never returned by default on any
  `User` query; explicitly opted into with `.select('+password')` only in
  the login controller, where it's needed to compare hashes.
- **`accountStatus` is separate from `role`** — role controls permissions
  (student/alumni/admin), accountStatus controls whether the account can be
  used at all (active/suspended). Keeping them separate means suspending a
  user doesn't require guessing what role to fall back to.
- **`experience` is free text, not a number** — students describe experience
  inconsistently ("2 years", "6 months", "fresher"). The "Most Experienced"
  sort and the experience filter both parse a leading number out of this
  string via a MongoDB aggregation stage rather than forcing a rigid input
  format on users.
- **`remainingSeats` is a virtual**, not a stored field — always derived
  from `maximumParticipants - registeredUsers.length`, so it can never drift
  out of sync with the actual registration count.

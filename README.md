# GymSync — full-stack (React + Express + MongoDB)

```
gymsync/
├─ client/                 React (Vite) front-end
│  └─ src/  api.js · context/AuthContext.jsx · components/AuthModal.jsx · pages/* · styles.css
└─ server/                 Express API (MVC)
   └─ src/
      ├─ models/           User · Booking · Contact          (Mongoose schemas)
      ├─ controllers/      auth · profile · booking · contact (business logic)
      ├─ routes/           URL → controller mapping
      ├─ middleware/       requireAuth · errorHandler
      ├─ services/         mailer (Nodemailer) · emailTemplates · dates
      ├─ config/           env · db
      ├─ app.js            Express app (helmet, cors, sessions, routes)
      └─ server.js         connects MongoDB, starts server
```

## 1. Setup
Requirements: **Node 18+** and **MongoDB** (local, or a free Atlas cluster).

```bash
cd gymsync
npm run install:all
cp server/.env.example server/.env     # then edit server/.env (see below)
npm run dev                            # API on :5000, site on http://localhost:5173
```

Edit `server/.env`:
| Variable | What to put |
|---|---|
| `MONGO_URI` | `mongodb://127.0.0.1:27017/gymsync` or your Atlas string |
| `SESSION_SECRET` | long random string: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `SMTP_*`, `MAIL_FROM` | your email provider (see §2). Leave `SMTP_HOST` empty to just log emails to the console |
| `TIMEZONE` | gym timezone, default `Asia/Kolkata` |

## 2. Booking confirmation emails
Flow: **Book → Confirm dialog → `POST /api/bookings` → booking saved → email sent to the logged-in user's email.**
If SMTP isn't configured the booking still succeeds and the UI says the email wasn't sent.

Pick any SMTP provider and fill `SMTP_HOST / PORT / USER / PASS`:
- **Gmail** (testing): `smtp.gmail.com`, port `587`, user = your Gmail, pass = an **App Password** (Google Account → Security → 2-Step Verification → App passwords). `MAIL_FROM` should be the same address.
- **Brevo / SendGrid / Mailgun / Amazon SES** (production): use their SMTP credentials and a verified sender domain.
- **Mailtrap** (safe testing inbox): use its sandbox SMTP details.

## 3. Auth (session + cookie)
- `Join now` opens the sign-up / log-in modal. When logged in the button becomes **Log out**.
- Passwords are hashed with **bcrypt** (12 rounds); never stored or returned in plain text.
- On login/register the server creates a session (`express-session`) stored in **MongoDB** (`connect-mongo`, `sessions` collection) and sends a cookie `gymsync.sid` that is **httpOnly**, `sameSite=lax`, and `secure` in production, valid 7 days.
- Session id is regenerated on login (prevents session fixation); logout destroys the session and clears the cookie.
- Login/register and contact endpoints are rate-limited; `helmet` adds security headers.
- The browser re-checks the session on every page load via `GET /api/auth/me`.

## 4. API
| Method & path | Auth | Purpose |
|---|---|---|
| `POST /api/auth/register` | – | create account + start session |
| `POST /api/auth/login` | – | log in |
| `POST /api/auth/logout` | – | log out |
| `GET  /api/auth/me` | – | current user or `{user:null}` |
| `GET / PUT /api/profile` | ✔ | read / update full profile |
| `GET /api/bookings` | ✔ | my bookings |
| `POST /api/bookings` | ✔ | book + send confirmation email |
| `DELETE /api/bookings/:id` | ✔ | cancel booking |
| `POST /api/contact` | – | store contact message in MongoDB |

Stored in MongoDB: `users` (profile), `bookings`, `contacts` (view them in Compass / Atlas → `gymsync` database), `sessions`.

## 5. Production
```bash
npm run build                          # builds client/dist
NODE_ENV=production in server/.env     # enables secure cookies
npm start                              # Express also serves client/dist (so page refresh on /schedule works)
```
- Serve over **HTTPS** (secure cookies need it).
- If front-end and API are on **different domains**, set `CLIENT_URL` to the site's URL, `COOKIE_SAMESITE=none`, and `VITE_API_URL` to the API's URL when building the client.

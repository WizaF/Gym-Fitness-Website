// Quick sanity check of routing, validation and auth guards. Doesn't need MongoDB.
process.env.SESSION_SECRET = "test-secret";
await import("../src/config/env.js");
const { createApp } = await import("../src/app.js");

const server = createApp().listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const call = async (method, url, body) => {
  const r = await fetch(base + url, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  return [r.status, await r.json()];
};
const check = (label, got, want) => { console.log(got === want ? "PASS" : "FAIL", label, `(got ${got}, want ${want})`); if (got !== want) process.exitCode = 1; };

check("health", (await call("GET", "/api/health"))[0], 200);
check("me when logged out", JSON.stringify((await call("GET", "/api/auth/me"))[1]), '{"user":null}');
check("register invalid -> 400", (await call("POST", "/api/auth/register", { name: "A", email: "x", password: "1" }))[0], 400);
check("login missing fields -> 400", (await call("POST", "/api/auth/login", {}))[0], 400);
check("bookings need login -> 401", (await call("GET", "/api/bookings"))[0], 401);
check("create booking needs login -> 401", (await call("POST", "/api/bookings", {}))[0], 401);
check("profile needs login -> 401", (await call("GET", "/api/profile"))[0], 401);
check("contact invalid -> 400", (await call("POST", "/api/contact", { name: "", email: "bad", message: "" }))[0], 400);
check("unknown api route -> 404", (await call("GET", "/api/nope"))[0], 404);

// email template + date helper
const { nextOccurrence } = await import("../src/services/dates.js");
const d = nextOccurrence("Mon", "06:00");
check("nextOccurrence is in the future", d > new Date(), true);
check("nextOccurrence is a Monday", d.getDay(), 1);
const { bookingConfirmation } = await import("../src/services/emailTemplates.js");
const m = bookingConfirmation({ user: { name: "<b>Sam</b>" }, booking: { className: "HIIT", gym: "G", date: d } });
check("email escapes html", m.html.includes("<b>Sam</b>"), false);

server.close();

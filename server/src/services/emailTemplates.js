const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function bookingConfirmation({ user, booking }) {
  const when = new Date(booking.date).toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: process.env.TIMEZONE || "Asia/Kolkata",
  });

  const subject = `Booking confirmed: ${booking.className} — ${when}`;

  const text = [
    `Hi ${user.name},`,
    "",
    "Your slot is confirmed!",
    "",
    `Class: ${booking.className}`,
    booking.coach ? `Coach: ${booking.coach}` : null,
    `Gym:   ${booking.gym}`,
    `When:  ${when}`,
    "",
    "You can cancel any time from your Profile page (up to 2 hours before class).",
    "See you there — GymSync",
  ].filter((l) => l !== null).join("\n");

  const row = (k, v) =>
    `<tr><td style="padding:8px 0;color:#8a918a;width:90px">${k}</td><td style="padding:8px 0;font-weight:600">${esc(v)}</td></tr>`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0b0d0f;padding:32px">
    <div style="max-width:520px;margin:auto;background:#14171a;border:1px solid #23272c;border-radius:16px;padding:32px;color:#f2f4f0">
      <div style="font-size:18px;font-weight:700;letter-spacing:.14em">GYM<span style="color:#c6ff3d">SYNC</span></div>
      <h2 style="margin:24px 0 6px">Your slot is confirmed ✅</h2>
      <p style="color:#9aa19a;margin:0 0 20px">Hi ${esc(user.name)}, you're all set.</p>
      <table style="width:100%;border-collapse:collapse;font-size:15px;border-top:1px solid #23272c;border-bottom:1px solid #23272c">
        ${row("Class", booking.className)}
        ${booking.coach ? row("Coach", booking.coach) : ""}
        ${row("Gym", booking.gym)}
        ${row("When", when)}
      </table>
      <p style="color:#9aa19a;font-size:13px;line-height:1.6;margin-top:20px">
        Need to change plans? Cancel from your Profile page up to 2 hours before class.
      </p>
    </div>
  </div>`;

  return { subject, text, html };
}

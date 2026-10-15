import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  transporter = SMTP_HOST
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      })
    : nodemailer.createTransport({ jsonTransport: true }); // dev: nothing leaves your machine
  return transporter;
}

/** Returns { delivered: boolean }. Throws if SMTP is configured but sending fails. */
export async function sendMail({ to, subject, html, text }) {
  const info = await getTransporter().sendMail({
    from: process.env.MAIL_FROM || "GymSync <no-reply@gymsync.local>",
    to,
    subject,
    html,
    text,
  });

  if (!process.env.SMTP_HOST) {
    console.log(`\n[mail:dev] SMTP_HOST not set — email NOT sent. Would have sent to ${to}:\n  Subject: ${subject}\n  ${text.replace(/\n/g, "\n  ")}\n`);
    return { delivered: false };
  }
  console.log("✉️  Email sent:", info.messageId);
  return { delivered: true };
}

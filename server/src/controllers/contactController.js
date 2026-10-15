import Contact from "../models/Contact.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** POST /api/contact — public; stores the message in MongoDB */
export async function submitContact(req, res, next) {
  try {
    const { name = "", email = "", phone = "", message = "" } = req.body;

    const errors = {};
    if (String(name).trim().length < 2) errors.name = "Please enter your name";
    if (!EMAIL_RE.test(String(email).trim())) errors.email = "Enter a valid email";
    if (String(message).trim().length < 5) errors.message = "Message is too short";
    if (Object.keys(errors).length) return res.status(400).json({ message: "Please check your details", errors });

    await Contact.create({
      name, email, phone, message,
      user: req.session?.userId || null,
      ip: req.ip,
    });
    res.status(201).json({ message: "Thanks! We've received your message." });
  } catch (e) {
    next(e);
  }
}

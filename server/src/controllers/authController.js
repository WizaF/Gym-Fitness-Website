import User from "../models/User.js";
import { COOKIE_NAME } from "../config/env.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** New session id on every login/register (prevents session fixation). */
function startSession(req, user) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) return reject(err);
      req.session.userId = user.id;
      req.session.save((e) => (e ? reject(e) : resolve()));
    });
  });
}

export async function register(req, res, next) {
  try {
    const name = String(req.body.name ?? "").trim();
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");

    const errors = {};
    if (name.length < 2) errors.name = "Please enter your name";
    if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email";
    if (password.length < 8) errors.password = "Password must be at least 8 characters";
    if (Object.keys(errors).length) return res.status(400).json({ message: "Please check your details", errors });

    if (await User.exists({ email })) {
      return res.status(409).json({ message: "An account with this email already exists", errors: { email: "Already registered" } });
    }

    const user = await User.create({ name, email, passwordHash: await User.hashPassword(password) });
    await startSession(req, user);
    res.status(201).json({ user: user.toSafeJSON() });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email }).select("+passwordHash");
    // Same message for unknown email / wrong password (don't leak which accounts exist)
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    await startSession(req, user);
    res.json({ user: user.toSafeJSON() });
  } catch (e) {
    next(e);
  }
}

export function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie(COOKIE_NAME);
    res.json({ message: "Logged out" });
  });
}

/** Always 200: { user } when logged in, { user: null } when not. */
export async function me(req, res, next) {
  try {
    if (!req.session?.userId) return res.json({ user: null });
    const user = await User.findById(req.session.userId);
    if (!user) return req.session.destroy(() => res.json({ user: null }));
    res.json({ user: user.toSafeJSON() });
  } catch (e) {
    next(e);
  }
}

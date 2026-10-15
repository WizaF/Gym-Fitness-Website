import User from "../models/User.js";

/** Blocks the request unless a valid session exists; attaches req.user. */
export async function requireAuth(req, res, next) {
  try {
    if (!req.session?.userId) return res.status(401).json({ message: "Please log in first" });
    const user = await User.findById(req.session.userId);
    if (!user) {
      return req.session.destroy(() => res.status(401).json({ message: "Session expired, please log in again" }));
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import { isProd, COOKIE_NAME } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp({ sessionStore } = {}) {
  const app = express();
  if (isProd) app.set("trust proxy", 1); // needed for secure cookies behind a proxy (Render, Heroku, Nginx…)

  app.use(helmet());
  app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
  app.use(express.json({ limit: "10kb" }));

  app.use(
    session({
      name: COOKIE_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false, // no cookie until someone logs in
      store: sessionStore,
      cookie: {
        httpOnly: true, // JS in the browser can't read it
        secure: isProd, // HTTPS only in production
        sameSite: process.env.COOKIE_SAMESITE || "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
    })
  );

  app.get("/api/health", (req, res) => res.json({ ok: true }));
  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api", notFound);

  // Production: serve the built React app too (also fixes refresh on /schedule, /profile…)
  const dist = path.resolve(__dirname, "../../client/dist");
  if (isProd && fs.existsSync(dist)) {
    app.use(express.static(dist));
    app.get("*", (req, res) => res.sendFile(path.join(dist, "index.html")));
  }

  app.use(errorHandler);
  return app;
}

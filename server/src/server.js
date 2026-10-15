import "./config/env.js"; // must be first: loads .env and sets TZ
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { connectDB } from "./config/db.js";
import { createApp } from "./app.js";

const { MONGO_URI, SESSION_SECRET, PORT = 5000 } = process.env;

if (!MONGO_URI || !SESSION_SECRET || SESSION_SECRET.startsWith("change-me")) {
  console.error("✗ Set MONGO_URI and a strong SESSION_SECRET in server/.env");
  process.exit(1);
}

await connectDB(MONGO_URI);

const sessionStore = MongoStore.create({
  client: mongoose.connection.getClient(),
  collectionName: "sessions",
  ttl: 7 * 24 * 60 * 60, // seconds; expired sessions are removed automatically
});

createApp({ sessionStore }).listen(PORT, () => console.log(`✓ API running on http://localhost:${PORT}`));

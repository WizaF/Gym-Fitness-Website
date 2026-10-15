import dotenv from "dotenv";
dotenv.config();
// Make every Date calculation use the gym's timezone
process.env.TZ = process.env.TIMEZONE || "Asia/Kolkata";

export const isProd = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "gymsync.sid";

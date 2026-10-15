import { isProd } from "../config/env.js";

export function notFound(req, res) {
  res.status(404).json({ message: "Route not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    const errors = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]));
    return res.status(400).json({ message: "Please check your details", errors });
  }
  if (err.code === 11000) return res.status(409).json({ message: "That already exists" });
  if (err.name === "CastError") return res.status(400).json({ message: "Invalid id" });
  if (err.type === "entity.parse.failed") return res.status(400).json({ message: "Invalid JSON body" });

  console.error(err);
  res.status(err.status || 500).json({ message: isProd ? "Something went wrong" : err.message });
}

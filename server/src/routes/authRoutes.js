import { Router } from "express";
import rateLimit from "express-rate-limit";
import { register, login, logout, me } from "../controllers/authController.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts, please try again in a few minutes" },
});

const router = Router();
router.post("/register", limiter, register);
router.post("/login", limiter, login);
router.post("/logout", logout);
router.get("/me", me);
export default router;

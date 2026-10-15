import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createBooking, listMyBookings, cancelBooking } from "../controllers/bookingController.js";

const router = Router();
router.use(requireAuth);
router.get("/", listMyBookings);
router.post("/", createBooking);
router.delete("/:id", cancelBooking);
export default router;

import Booking, { DAYS } from "../models/Booking.js";
import { nextOccurrence } from "../services/dates.js";
import { sendMail } from "../services/mailer.js";
import { bookingConfirmation } from "../services/emailTemplates.js";

/** POST /api/bookings — create booking, then email the confirmation to the user. */
export async function createBooking(req, res, next) {
  try {
    const { day, time, className, coach = "", gym } = req.body;
    if (!DAYS.includes(day) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time || "") || !String(className || "").trim()) {
      return res.status(400).json({ message: "Invalid class details" });
    }

    let booking;
    try {
      booking = await Booking.create({
        user: req.user.id,
        day, time, className, coach,
        gym: gym || undefined,
        date: nextOccurrence(day, time),
      });
    } catch (e) {
      if (e.code === 11000) return res.status(409).json({ message: "You've already booked this class" });
      throw e;
    }

    // Confirmation email — booking stays valid even if the email fails
    let emailSent = false;
    let emailError = null;
    try {
      const mail = bookingConfirmation({ user: req.user, booking });
      const { delivered } = await sendMail({ to: req.user.email, ...mail });
      emailSent = delivered;
      if (!delivered) emailError = "Email service isn't configured yet";
      booking.emailSent = delivered;
      await booking.save();
    } catch (err) {
      console.error("Booking email failed:", err.message);
      emailError = "We couldn't send the confirmation email";
    }

    res.status(201).json({ booking, emailSent, emailError, sentTo: req.user.email });
  } catch (e) {
    next(e);
  }
}

/** GET /api/bookings — my bookings (confirmed by default, ?status=all for everything) */
export async function listMyBookings(req, res, next) {
  try {
    const filter = { user: req.user.id };
    if (req.query.status !== "all") filter.status = "confirmed";
    const bookings = await Booking.find(filter).sort({ date: 1 });
    res.json({ bookings });
  } catch (e) {
    next(e);
  }
}

/** DELETE /api/bookings/:id — cancel my booking */
export async function cancelBooking(req, res, next) {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id, status: "confirmed" },
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ booking });
  } catch (e) {
    next(e);
  }
}

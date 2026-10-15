import mongoose from "mongoose";

const { Schema } = mongoose;
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    gym: { type: String, trim: true, maxlength: 100, default: "GymSync Studio" },
    className: { type: String, required: true, trim: true, maxlength: 100 },
    coach: { type: String, trim: true, maxlength: 80, default: "" },
    day: { type: String, enum: DAYS, required: true },
    time: { type: String, required: true, match: [/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be HH:MM"] },
    date: { type: Date, required: true }, // next occurrence of that day/time when booked
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// A user can't hold the same active slot twice (cancelled ones don't count)
bookingSchema.index(
  { user: 1, day: 1, time: 1, className: 1 },
  { unique: true, partialFilterExpression: { status: "confirmed" } }
);

export default mongoose.model("Booking", bookingSchema);

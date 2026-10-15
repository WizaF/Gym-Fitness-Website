import mongoose from "mongoose";

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, maxlength: 80 },
    email: { type: String, required: [true, "Email is required"], lowercase: true, trim: true },
    phone: { type: String, trim: true, maxlength: 20, default: "" },
    message: { type: String, required: [true, "Message is required"], trim: true, minlength: 5, maxlength: 2000 },
    user: { type: Schema.Types.ObjectId, ref: "User", default: null }, // set if sender was logged in
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
    ip: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);

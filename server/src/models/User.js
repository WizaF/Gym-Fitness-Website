import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, maxlength: 80 },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },

    // ---- profile information ----
    phone: { type: String, trim: true, maxlength: 20, default: "" },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, enum: ["", "male", "female", "other", "prefer_not_to_say"], default: "" },
    city: { type: String, trim: true, maxlength: 80, default: "" },
    heightCm: { type: Number, min: [50, "Height looks too low"], max: [260, "Height looks too high"], default: null },
    weightKg: { type: Number, min: [20, "Weight looks too low"], max: [400, "Weight looks too high"], default: null },
    fitnessGoal: {
      type: String,
      enum: ["", "lose_weight", "build_muscle", "stay_active", "improve_endurance", "flexibility"],
      default: "",
    },
    experienceLevel: { type: String, enum: ["", "beginner", "intermediate", "advanced"], default: "" },
    homeGym: { type: String, trim: true, maxlength: 100, default: "" },
    emergencyContactName: { type: String, trim: true, maxlength: 80, default: "" },
    emergencyContactPhone: { type: String, trim: true, maxlength: 20, default: "" },
    bio: { type: String, trim: true, maxlength: [300, "Bio can be at most 300 characters"], default: "" },
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = (plain) => bcrypt.hash(plain, 12);
userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};
userSchema.methods.toSafeJSON = function () {
  const o = this.toObject();
  delete o.passwordHash;
  delete o.__v;
  return o;
};

export default mongoose.model("User", userSchema);

const FIELDS = [
  "name", "phone", "dateOfBirth", "gender", "city", "heightCm", "weightKg",
  "fitnessGoal", "experienceLevel", "homeGym", "emergencyContactName", "emergencyContactPhone", "bio",
];
const NUMBER_FIELDS = ["heightCm", "weightKg"];

export function getProfile(req, res) {
  res.json({ user: req.user.toSafeJSON() });
}

export async function updateProfile(req, res, next) {
  try {
    for (const f of FIELDS) {
      if (!(f in req.body)) continue; // email & password can't be changed here
      let v = req.body[f];
      if (NUMBER_FIELDS.includes(f)) v = v === "" || v === null ? null : Number(v);
      if (f === "dateOfBirth") v = v ? new Date(v) : null;
      if (f === "name" && !String(v).trim()) return res.status(400).json({ message: "Name can't be empty", errors: { name: "Required" } });
      req.user[f] = v;
    }
    await req.user.save(); // runs schema validators
    res.json({ user: req.user.toSafeJSON() });
  } catch (e) {
    next(e);
  }
}

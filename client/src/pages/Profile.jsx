import { useEffect, useState } from "react";
import Reveal from "../components/Reveal.jsx";
import Count from "../components/Count.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

const goals = [["", "Select…"], ["lose_weight", "Lose weight"], ["build_muscle", "Build muscle"], ["stay_active", "Stay active"], ["improve_endurance", "Improve endurance"], ["flexibility", "Flexibility & mobility"]];
const levels = [["", "Select…"], ["beginner", "Beginner"], ["intermediate", "Intermediate"], ["advanced", "Advanced"]];
const genders = [["", "Select…"], ["male", "Male"], ["female", "Female"], ["other", "Other"], ["prefer_not_to_say", "Prefer not to say"]];

const toForm = (u) => ({
  name: u.name || "", phone: u.phone || "", dateOfBirth: u.dateOfBirth ? u.dateOfBirth.slice(0, 10) : "",
  gender: u.gender || "", city: u.city || "", heightCm: u.heightCm ?? "", weightKg: u.weightKg ?? "",
  fitnessGoal: u.fitnessGoal || "", experienceLevel: u.experienceLevel || "", homeGym: u.homeGym || "",
  emergencyContactName: u.emergencyContactName || "", emergencyContactPhone: u.emergencyContactPhone || "", bio: u.bio || "",
});

export default function Profile() {
  const { user, setUser, loading, openAuth } = useAuth();
  const [form, setForm] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!user) { setForm(null); setBookings([]); return; }
    setForm((f) => f || toForm(user));
    api.get("/bookings").then((d) => setBookings(d.bookings)).catch(() => {});
  }, [user]);

  if (loading) return <section className="page pad"><p className="muted">Loading…</p></section>;

  if (!user) {
    return (
      <section className="page pad">
        <div className="card gate">
          <div className="ic">🔒</div>
          <h2>Log in to see your profile</h2>
          <p className="sub">Your details, bookings and progress are saved to your account.</p>
          <div className="row">
            <button className="btn" onClick={() => openAuth("login")}>Log in</button>
            <button className="btn ghost" onClick={() => openAuth("signup")}>Create account</button>
          </div>
        </div>
      </section>
    );
  }
  if (!form) return null;

  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); setMsg(null); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg(null); setFieldErrors({});
    try {
      const d = await api.put("/profile", form);
      setUser(d.user); setForm(toForm(d.user));
      setMsg({ type: "ok", text: "✓ Profile saved" });
    } catch (err) {
      setMsg({ type: "err", text: err.message }); setFieldErrors(err.errors || {});
    } finally {
      setSaving(false);
    }
  };

  const cancel = async (b) => {
    if (!window.confirm(`Cancel ${b.className}?`)) return;
    try { await api.del(`/bookings/${b._id}`); setBookings((l) => l.filter((x) => x._id !== b._id)); }
    catch (err) { setMsg({ type: "err", text: err.message }); }
  };

  const initials = user.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const upcoming = bookings.filter((b) => new Date(b.date) > new Date());
  const field = (k, label, props = {}) => (
    <label className="field">{label}
      <input value={form[k]} onChange={set(k)} {...props} />
      {fieldErrors[k] && <em className="err">{fieldErrors[k]}</em>}
    </label>
  );
  const select = (k, label, opts) => (
    <label className="field">{label}
      <select value={form[k]} onChange={set(k)}>{opts.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select>
    </label>
  );

  return (
    <section className="page pad">
      <Reveal>
        <div className="card me">
          <div className="avatar">{initials}</div>
          <div className="grow">
            <h2>{user.name}</h2>
            <p className="sub" style={{ margin: 0 }}>{user.email} · Member since {new Date(user.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</p>
          </div>
        </div>
      </Reveal>

      <div className="stats inline">
        <div><Count to={bookings.length} /><span>Booked classes</span></div>
        <div><Count to={upcoming.length} /><span>Upcoming</span></div>
      </div>

      <div className="split">
        <form className="card form" onSubmit={save} noValidate>
          <h3>Your details</h3>
          <div className="fields">
            {field("name", "Full name", { required: true })}
            {field("phone", "Phone", { inputMode: "tel" })}
            {field("dateOfBirth", "Date of birth", { type: "date" })}
            {select("gender", "Gender", genders)}
            {field("city", "City")}
            {field("homeGym", "Home gym")}
            {field("heightCm", "Height (cm)", { type: "number", min: 50, max: 260 })}
            {field("weightKg", "Weight (kg)", { type: "number", min: 20, max: 400, step: "0.1" })}
            {select("fitnessGoal", "Fitness goal", goals)}
            {select("experienceLevel", "Experience", levels)}
            {field("emergencyContactName", "Emergency contact name")}
            {field("emergencyContactPhone", "Emergency contact phone", { inputMode: "tel" })}
          </div>
          <label className="field">About you
            <textarea rows="3" maxLength={300} value={form.bio} onChange={set("bio")} placeholder="Anything your coach should know?" />
            {fieldErrors.bio && <em className="err">{fieldErrors.bio}</em>}
          </label>
          <button className="btn" type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}</button>
          {msg && <p className={msg.type === "ok" ? "ok" : "err"}>{msg.text}</p>}
        </form>

        <div className="card">
          <h3>Upcoming classes</h3>
          {upcoming.length === 0 && <p className="muted" style={{ marginTop: 12 }}>No upcoming bookings. Head to the Schedule page to book a slot.</p>}
          {upcoming.map((b) => (
            <div className="row2" key={b._id}>
              <div>
                <b>{b.className}</b>
                <small className="muted block">{new Date(b.date).toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {b.gym}</small>
              </div>
              <button className="x" aria-label="Cancel booking" onClick={() => cancel(b)}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

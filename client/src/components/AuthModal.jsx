import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthModal() {
  const { modal, closeAuth, login, register } = useAuth();
  const [mode, setMode] = useState(modal.mode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (modal.open) { setMode(modal.mode); setError(""); setFieldErrors({}); } }, [modal.open, modal.mode]);
  useEffect(() => {
    if (!modal.open) return;
    const esc = (e) => e.key === "Escape" && closeAuth();
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [modal.open, closeAuth]);

  if (!modal.open) return null;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError(""); setFieldErrors({});
    try {
      if (mode === "signup") await register(form.name, form.email, form.password);
      else await login(form.email, form.password);
      setForm({ name: "", email: "", password: "" });
      closeAuth();
    } catch (err) {
      setError(err.message);
      setFieldErrors(err.errors || {});
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-bg" onMouseDown={(e) => e.target === e.currentTarget && closeAuth()}>
      <div className="modal card" role="dialog" aria-modal="true">
        <button className="x close" aria-label="Close" onClick={closeAuth}>✕</button>
        <div className="auth-tabs">
          <button className={"tab" + (mode === "signup" ? " on" : "")} onClick={() => setMode("signup")} type="button">Join free</button>
          <button className={"tab" + (mode === "login" ? " on" : "")} onClick={() => setMode("login")} type="button">Log in</button>
        </div>
        <h3>{mode === "signup" ? "Create your account" : "Welcome back"}</h3>
        <p className="muted">{modal.message || (mode === "signup" ? "Save your schedule and book slots at any gym." : "Log in to see your schedule and bookings.")}</p>

        <form className="form" onSubmit={submit} noValidate>
          {mode === "signup" && (
            <label className="field">Full name
              <input value={form.name} onChange={set("name")} autoComplete="name" required />
              {fieldErrors.name && <em className="err">{fieldErrors.name}</em>}
            </label>
          )}
          <label className="field">Email
            <input type="email" value={form.email} onChange={set("email")} autoComplete="email" required />
            {fieldErrors.email && <em className="err">{fieldErrors.email}</em>}
          </label>
          <label className="field">Password
            <input type="password" value={form.password} onChange={set("password")} autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder={mode === "signup" ? "At least 8 characters" : ""} required />
            {fieldErrors.password && <em className="err">{fieldErrors.password}</em>}
          </label>
          {error && !Object.keys(fieldErrors).length && <p className="err">{error}</p>}
          <button className="btn" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}</button>
        </form>
      </div>
    </div>
  );
}

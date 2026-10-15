import { useEffect, useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

const empty = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Pre-fill for logged-in users
  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: f.name || user.name, email: f.email || user.email, phone: f.phone || user.phone || "" }));
  }, [user]);

  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); setSent(false); };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError(""); setFieldErrors({}); setSent(false);
    try {
      await api.post("/contact", form);
      setSent(true);
      setForm({ ...empty, name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
    } catch (err) {
      setError(err.message); setFieldErrors(err.errors || {});
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="page pad">
      <Reveal><h2>Contact us</h2><p className="sub">Questions, partnerships or want to list your gym? Send us a message — we reply within a day.</p></Reveal>
      <div className="split">
        <form className="card form" onSubmit={submit} noValidate>
          <label className="field">Full name
            <input value={form.name} onChange={set("name")} required />
            {fieldErrors.name && <em className="err">{fieldErrors.name}</em>}
          </label>
          <label className="field">Email
            <input type="email" value={form.email} onChange={set("email")} required />
            {fieldErrors.email && <em className="err">{fieldErrors.email}</em>}
          </label>
          <label className="field">Phone (optional)
            <input value={form.phone} onChange={set("phone")} />
          </label>
          <label className="field">Message
            <textarea rows="5" value={form.message} onChange={set("message")} required />
            {fieldErrors.message && <em className="err">{fieldErrors.message}</em>}
          </label>
          <button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Send message"}</button>
          {sent && <p className="ok">✓ Thanks! Your message has been received.</p>}
          {error && !Object.keys(fieldErrors).length && <p className="err">{error}</p>}
        </form>

        <div className="card info">
          <h3>Get in touch</h3>
          <p>📍 DisneyLand</p>
          <p>📞 +91 99688 11069</p>
          <p>✉️ dildhariwal02@gmail.com</p>
          <h3>Support hours</h3>
          <p>Mon–Sat 9am – 8pm</p>
        </div>
      </div>
    </section>
  );
}

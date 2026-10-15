import { useEffect, useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const GYM = "GymSync Studio";
// time, class, coach, spots left
const timetable = {
  Mon: [["06:00", "Strength Lab", "Coach Arjun", 8], ["18:00", "HIIT Engine", "Coach Meera", 5], ["19:30", "Mobility Flow", "Coach Sana", 12]],
  Tue: [["07:00", "Spin & Burn", "Coach Rohan", 10], ["18:30", "Strength Lab", "Coach Arjun", 6]],
  Wed: [["06:00", "HIIT Engine", "Coach Meera", 9], ["17:30", "Boxing Basics", "Coach Dev", 7], ["19:00", "Mobility Flow", "Coach Sana", 14]],
  Thu: [["07:00", "Strength Lab", "Coach Arjun", 4], ["18:30", "Spin & Burn", "Coach Rohan", 11]],
  Fri: [["06:30", "HIIT Engine", "Coach Meera", 8], ["18:00", "Powerlifting Club", "Coach Arjun", 6]],
  Sat: [["09:00", "Community WOD", "All coaches", 20], ["11:00", "Yoga & Breathwork", "Coach Sana", 15]],
  Sun: [["10:00", "Mobility & Recovery", "Coach Sana", 18]],
};
const keyOf = (day, time, className) => `${day}|${time}|${className}`;

export default function Schedule() {
  const { user, openAuth } = useAuth();
  const [day, setDay] = useState("Mon");
  const [bookings, setBookings] = useState([]);
  const [pending, setPending] = useState(null); // class waiting for "Confirm"
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null); // { type: "ok" | "warn" | "err", text }

  // Load my bookings whenever the logged-in user changes
  useEffect(() => {
    if (!user) { setBookings([]); return; }
    api.get("/bookings").then((d) => setBookings(d.bookings)).catch(() => {});
  }, [user]);

  const booked = Object.fromEntries(bookings.map((b) => [keyOf(b.day, b.time, b.className), b]));

  const onBook = (slot) => {
    setNotice(null);
    if (!user) return openAuth("login", "Log in to book your slot");
    setPending(slot);
  };

  const confirm = async () => {
    setBusy(true);
    try {
      const d = await api.post("/bookings", { ...pending, gym: GYM });
      setBookings((b) => [...b, d.booking]);
      setNotice(d.emailSent
        ? { type: "ok", text: `✓ Slot confirmed! A confirmation email was sent to ${d.sentTo}.` }
        : { type: "warn", text: `✓ Slot confirmed, but the email wasn't sent (${d.emailError}).` });
      setPending(null);
    } catch (err) {
      setNotice({ type: "err", text: err.message });
      setPending(null);
    } finally {
      setBusy(false);
    }
  };

  const cancel = async (b) => {
    if (!window.confirm(`Cancel ${b.className} on ${b.day} at ${b.time}?`)) return;
    try {
      await api.del(`/bookings/${b._id}`);
      setBookings((list) => list.filter((x) => x._id !== b._id));
      setNotice({ type: "ok", text: "Booking cancelled." });
    } catch (err) {
      setNotice({ type: "err", text: err.message });
    }
  };

  return (
    <section className="page pad">
      <Reveal>
        <h2>Class schedule</h2>
        <p className="sub">Book your spot, confirm it, and we'll email you the details. Cancel up to 2 hours before class.</p>
      </Reveal>

      {notice && <div className={"notice " + notice.type}>{notice.text}</div>}

      <div className="tabs">
        {days.map((d) => (
          <button key={d} className={"tab" + (d === day ? " on" : "")} onClick={() => setDay(d)}>{d}</button>
        ))}
      </div>

      <div className="list">
        {timetable[day].map(([time, className, coach, spots]) => {
          const b = booked[keyOf(day, time, className)];
          return (
            <div className="card item" key={day + time}>
              <div className="time">{time}</div>
              <div className="grow"><h3>{className}</h3><p>{coach} · {spots - (b ? 1 : 0)} spots left</p></div>
              {b
                ? <button className="btn ghost" onClick={() => cancel(b)}>Booked ✓ · Cancel</button>
                : <button className="btn" onClick={() => onBook({ day, time, className, coach })}>Book</button>}
            </div>
          );
        })}
      </div>

      {pending && (
        <div className="modal-bg" onMouseDown={(e) => e.target === e.currentTarget && !busy && setPending(null)}>
          <div className="modal card" role="dialog" aria-modal="true">
            <h3>Confirm your booking</h3>
            <div className="summary">
              <div><span>Class</span><b>{pending.className}</b></div>
              <div><span>Coach</span><b>{pending.coach}</b></div>
              <div><span>Day</span><b>{pending.day}</b></div>
              <div><span>Time</span><b>{pending.time}</b></div>
              <div><span>Gym</span><b>{GYM}</b></div>
            </div>
            <p className="muted">A confirmation email will be sent to <b>{user.email}</b>.</p>
            <div className="row">
              <button className="btn" onClick={confirm} disabled={busy}>{busy ? "Booking…" : "Confirm booking"}</button>
              <button className="btn ghost" onClick={() => setPending(null)} disabled={busy}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

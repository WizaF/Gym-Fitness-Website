import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Count from "../components/Count.jsx";
import Tilt from "../components/Tilt.jsx";
import WeekPlanner from "../components/WeekPlanner.jsx";

const chips = ["Strength", "Yoga", "HIIT", "CrossFit", "Swimming", "Boxing"];

const gymsList = [
  ["🏋️", "Downtown Iron Gym", "Open 24/7", ["Strength", "Cardio", "PT"]],
  ["🔥", "Pulse Fitness", "5am – 11pm", ["HIIT", "Spin", "Classes"]],
  ["🧘", "Zen Yoga Studio", "6am – 9pm", ["Yoga", "Pilates", "Recovery"]],
  ["🏊", "Aqua Club Pool", "6am – 10pm", ["Swimming", "Aqua fit", "Sauna"]],
];

const steps = [
  ["Find a gym", "Browse gyms near you or anywhere you travel. Drop-in, trial or member — it all works."],
  ["Add your workout", "Pick the gym, day and time. Mix as many gyms as you like in one weekly plan."],
  ["Show up & track", "Get reminders, check off sessions and watch your streak grow."],
];

const features = [
  ["🗺️", "Any gym, one plan", "Lift at one gym, swim at another, do yoga at a third — all on a single calendar."],
  ["⏰", "Smart reminders", "Nudges before each session so a busy day never kills your streak."],
  ["👯", "Train with friends", "Share your week and see when your workout buddies are at the gym."],
  ["📈", "Progress that sticks", "Streaks, weekly totals and goals across every gym you visit."],
];

export default function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const go = (e) => { e?.preventDefault(); nav("/schedule"); };

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="c">
          <span className="pill"><i /> Any gym · Any time · One schedule</span>
          <h1>Plan your week at <span>any gym.</span></h1>
          <p>Find a gym, add your workouts, and keep your whole fitness schedule in one place — no matter how many gyms you train at.</p>

          <form className="search" onSubmit={go}>
            <span>📍</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search gym name or city…" aria-label="Search gyms" />
            <button className="btn" type="submit">Find gyms</button>
          </form>
          <div className="chips">
            {chips.map((c) => <button key={c} type="button" className="chip" onClick={go}>{c}</button>)}
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <div className="stats">
        {[[2400, "+", "Gyms listed"], [86, "", "Cities"], [120000, "+", "Workouts planned"], [0, "₹0", "To get started"]].map(([n, s, l]) => (
          <Reveal key={l}>
            {n === 0 ? <b>{s}</b> : <Count to={n} suffix={s} />}
            <span>{l}</span>
          </Reveal>
        ))}
      </div>

      {/* ---------- how it works ---------- */}
      <section id="how" className="pad">
        <Reveal><h2>Three steps to a planned week</h2><p className="sub">No spreadsheets, no scattered notes. Just a clear schedule you'll actually follow.</p></Reveal>
        <div className="grid steps">
          {steps.map(([t, d], k) => (
            <Reveal key={t} delay={k * 100}><div className="card step"><h3>{t}</h3><p>{d}</p></div></Reveal>
          ))}
        </div>
      </section>

      {/* ---------- live planner demo ---------- */}
      <section id="planner" className="pad">
        <div className="split wide">
          <Reveal>
            <h2>Try it — build your week</h2>
            <p className="sub">Pick a day, choose any gym, add your workout. This is exactly how your schedule will look.</p>
            <ul className="ticks">
              <li>Add workouts across different gyms</li>
              <li>See every day at a glance</li>
              <li>Edit or remove in one tap</li>
            </ul>
            <Link className="btn ghost" to="/schedule">Open full schedule</Link>
          </Reveal>
          <Reveal delay={150}><WeekPlanner /></Reveal>
        </div>
      </section>

      {/* ---------- featured gyms ---------- */}
      <section id="gyms" className="pad">
        <Reveal><h2>Gyms on the platform</h2><p className="sub">A few popular spots. Add any of them to your schedule in seconds.</p></Reveal>
        <div className="grid">
          {gymsList.map(([ic, name, hours, tags], k) => (
            <Reveal key={name} delay={k * 100}>
              <Tilt>
                <div className="ic">{ic}</div>
                <h3>{name}</h3>
                <p>🕒 {hours}</p>
                <div className="tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
                <Link className="btn ghost sm" to="/schedule">Add to my schedule</Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- features ---------- */}
      <section className="pad">
        <Reveal><h2>Built for people who train everywhere</h2></Reveal>
        <div className="grid" style={{ marginTop: 28 }}>
          {features.map(([i, t, d], k) => (
            <Reveal key={t} delay={k * 100}><div className="card"><div className="ic">{i}</div><h3>{t}</h3><p>{d}</p></div></Reveal>
          ))}
        </div>
      </section>

      {/* ---------- for gym owners ---------- */}
      <section className="pad">
        <Reveal>
          <div className="card owner">
            <div className="grow">
              <span className="pill">For gym owners</span>
              <h2 style={{ marginTop: 16 }}>Run a gym? List it free.</h2>
              <p className="sub" style={{ marginBottom: 0 }}>Publish your class timetable and opening hours, and let members across the city add your sessions to their plan.</p>
            </div>
            <Link className="btn" to="/contact">List your gym</Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- cta ---------- */}
      <section className="cta">
        <Reveal>
          <h2>Your best week starts with a plan.</h2>
          <p className="sub">Add your first workout in under a minute. Free, forever.</p>
          <Link className="btn" to="/schedule">Create my schedule</Link>
        </Reveal>
      </section>
    </>
  );
}

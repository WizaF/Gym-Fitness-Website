import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const gyms = ["Downtown Iron Gym", "Pulse Fitness", "Harbor CrossFit", "Zen Yoga Studio", "Aqua Club Pool"];

const seed = [
  { id: 1, day: "Mon", time: "06:30", gym: "Downtown Iron Gym", workout: "Legs & core" },
  { id: 2, day: "Mon", time: "19:00", gym: "Zen Yoga Studio", workout: "Evening flow" },
  { id: 3, day: "Wed", time: "07:00", gym: "Harbor CrossFit", workout: "WOD" },
  { id: 4, day: "Fri", time: "18:00", gym: "Pulse Fitness", workout: "Push day" },
  { id: 5, day: "Sat", time: "09:00", gym: "Aqua Club Pool", workout: "Lap swim" },
];

/** Interactive mini planner: add a workout at any gym, on any day. */
export default function WeekPlanner() {
  const [day, setDay] = useState("Mon");
  const [items, setItems] = useState(seed);
  const [gym, setGym] = useState(gyms[0]);
  const [workout, setWorkout] = useState("");
  const [time, setTime] = useState("07:00");

  const add = (e) => {
    e.preventDefault();
    if (!workout.trim()) return;
    setItems([...items, { id: Date.now(), day, time, gym, workout: workout.trim() }]);
    setWorkout("");
  };
  const remove = (id) => setItems(items.filter((i) => i.id !== id));
  const today = items.filter((i) => i.day === day).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="card planner">
      <div className="tabs">
        {days.map((d) => {
          const n = items.filter((i) => i.day === d).length;
          return (
            <button key={d} className={"tab" + (d === day ? " on" : "")} onClick={() => setDay(d)}>
              {d}{n > 0 && <span className="dot">{n}</span>}
            </button>
          );
        })}
      </div>

      <div className="plist">
        {today.length === 0 && <p className="empty">Nothing planned for {day}. Add a workout below 👇</p>}
        {today.map((i) => (
          <div className="pitem" key={i.id}>
            <span className="ptime">{i.time}</span>
            <div className="grow"><b>{i.workout}</b><small>{i.gym}</small></div>
            <button className="x" aria-label="Remove" onClick={() => remove(i.id)}>✕</button>
          </div>
        ))}
      </div>

      <form className="padd form" onSubmit={add}>
        <input placeholder="Workout (e.g. Back & biceps)" value={workout} onChange={(e) => setWorkout(e.target.value)} />
        <div className="two">
          <select value={gym} onChange={(e) => setGym(e.target.value)}>
            {gyms.map((g) => <option key={g}>{g}</option>)}
          </select>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <button className="btn" type="submit">+ Add to {day}</button>
      </form>
    </div>
  );
}

const JS_DAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Next calendar date on which `day` at `time` ("HH:MM") will happen (server TZ = gym TZ). */
export function nextOccurrence(day, time) {
  const [h, m] = time.split(":").map(Number);
  const now = new Date();
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  let diff = (JS_DAY[day] - now.getDay() + 7) % 7;
  if (diff === 0 && d <= now) diff = 7;
  d.setDate(now.getDate() + diff);
  return d;
}

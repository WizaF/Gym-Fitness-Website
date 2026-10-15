import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import Tilt from "../components/Tilt.jsx";

const plans = [
  { id: "starter", name: "Starter", price: 29 },
  { id: "pro", name: "Pro", price: 59 },
  { id: "elite", name: "Elite", price: 119 },
];
const history = [["01 Oct 2026", "Pro membership", "$59.00", "Paid"], ["01 Sep 2026", "Pro membership", "$59.00", "Paid"], ["01 Aug 2026", "Pro membership", "$59.00", "Paid"]];

export default function Payments() {
  const [plan, setPlan] = useState("pro");
  const [yearly, setYearly] = useState(false);
  const [done, setDone] = useState(false);
  const sel = plans.find((p) => p.id === plan);
  const total = yearly ? Math.round(sel.price * 12 * 0.85) : sel.price;

  const submit = (e) => {
    e.preventDefault();
    // TODO: connect your payment gateway here (Razorpay / Stripe) — this form is a UI demo only.
    setDone(true);
  };

  return (
    <section className="page pad">
      <Reveal><h2>Payments</h2><p className="sub">Choose a plan and pay securely. Save 15% on yearly billing.</p></Reveal>

      <div className="grid">
        {plans.map((p) => (
          <Tilt key={p.id} className={plan === p.id ? "feat" : ""}>
            <h3>{p.name}</h3>
            <div className="price">${p.price}<small>/mo</small></div>
            <button className={"btn" + (plan === p.id ? "" : " ghost")} onClick={() => { setPlan(p.id); setDone(false); }}>
              {plan === p.id ? "Selected" : "Select"}
            </button>
          </Tilt>
        ))}
      </div>

      <div className="split">
        <form className="card form" onSubmit={submit}>
          <h3>Checkout</h3>
          <label className="switch">
            <input type="checkbox" checked={yearly} onChange={(e) => setYearly(e.target.checked)} /> Bill yearly (save 15%)
          </label>
          <input required placeholder="Name on card" />
          <input required placeholder="Card number" inputMode="numeric" maxLength={19} />
          <div className="two"><input required placeholder="MM / YY" /><input required placeholder="CVC" maxLength={4} /></div>
          <button className="btn" type="submit">Pay ${total}{yearly ? " / year" : " / month"}</button>
          {done && <p className="ok">✓ Demo checkout complete — connect a payment gateway to go live.</p>}
        </form>

        <div className="card">
          <h3>Payment history</h3>
          <table>
            <tbody>
              {history.map(([d, n, a, s]) => (
                <tr key={d}><td>{d}</td><td>{n}</td><td>{a}</td><td className="ok">{s}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

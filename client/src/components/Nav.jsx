import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { links } from "../data/links.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { user, loading, logout, openAuth } = useAuth();
  const navigate = useNavigate();

  const close = () => setOpen(false);
  const handleAuth = async () => {
    close();
    if (user) { await logout(); navigate("/"); }
    else openAuth("signup");
  };
  const label = user ? "Log out" : "Join now";

  return (
    <nav>
      <Link to="/" className="logo" onClick={close}>GYM<b>BROCODE</b></Link>
      <ul className={open ? "open" : ""}>
        <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
        {links.map((l) => (
          <li key={l.href}><NavLink to={l.href} onClick={close}>{l.label}</NavLink></li>
        ))}
        <li className="only-mobile"><button className="btn" onClick={handleAuth}>{label}</button></li>
      </ul>
      {user && <span className="hello">Hi, {user.name.split(" ")[0]}</span>}
      <button className={"btn nav-cta" + (user ? " ghost" : "")} onClick={handleAuth} disabled={loading}>{label}</button>
      <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
    </nav>
  );
}

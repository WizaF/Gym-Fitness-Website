import { Link } from "react-router-dom";
import { links } from "../data/links.js";

export default function Footer() {
  return (
    <footer>
      <span>© 2026 GymSync — one schedule, any gym</span>
      <span className="flinks">
        {links.map((l) => <Link key={l.href} to={l.href}>{l.label}</Link>)}
      </span>
    </footer>
  );
}

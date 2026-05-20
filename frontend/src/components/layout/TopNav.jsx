import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const links = [
  { label: "Schedule", href: "/schedule" },
  { label: "Payments", href: "/payments" },
  { label: "Wall of 💘", href: "/Wall-of-Heart" },
  { label: "Contact", href: "/contact" },
  { label: "Profile", href: "/profile" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { user, logout } = useAuth();

  const active = location.pathname;

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <nav className="w-full bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/8 sticky top-0 z-50">
      <div className="h-px w-full bg-linear-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14 gap-3">
        <Link
          to="/"
          className="text-white font-semibold text-sm tracking-widest uppercase hover:text-amber-400 transition-colors duration-200"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.15em" }}
        >
          JimBroCode
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ label, href }) => {
            const isActive = active === href;
            return (
              <li key={href}>
                <Link
                  to={href}
                  className={`px-3 py-1.5 rounded-lg text-xs tracking-widest uppercase font-medium transition-all duration-200 ${
                    isActive
                      ? "text-amber-400 bg-amber-400/10"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg text-xs tracking-widest uppercase font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-all duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-lg text-xs tracking-widest uppercase font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-all duration-200"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-amber-400/50 focus-within:bg-white/8 transition-all duration-200">
            <svg
              className="w-3.5 h-3.5 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
              />
            </svg>
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white text-xs placeholder-white/25 outline-none w-28"
            />
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-4 h-px bg-white/60 transition-all duration-300 ${open ? "rotate-45 translate-y-1.25" : ""}`} />
            <span className={`block w-4 h-px bg-white/60 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-px bg-white/60 transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.25" : ""}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-5 pb-4 pt-2 flex flex-col gap-1 border-t border-white/5">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-xs tracking-widest uppercase font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2.5 rounded-lg text-xs tracking-widest uppercase font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-xs tracking-widest uppercase font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Login
            </Link>
          )}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 mt-2">
            <svg
              className="w-3.5 h-3.5 text-white/30 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
              />
            </svg>
            <input
              type="search"
              placeholder="Search"
              className="bg-transparent text-white text-xs placeholder-white/25 outline-none w-full shrink-0"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

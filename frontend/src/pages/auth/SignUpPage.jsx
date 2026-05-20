import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = signup({ name, email, password, role });
    if (result?.error) {
      setError(result.error);
      return;
    }

    navigate("/profile");
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-4xl border border-white/3 p-8 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl">
        <div className="text-center mb-8">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase mb-3">Create Account</p>
          <h1 className="text-4xl font-semibold text-white">Register for access</h1>
          <p className="text-white/50 mt-3 text-sm">Start with a free account using email and password.</p>
        </div>

        {error ? <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200 mb-6">{error}</div> : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-white/60 text-sm mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-400/70 focus:bg-white/10"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white/60 text-sm mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-400/70 focus:bg-white/10"
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="password" className="block text-white/60 text-sm mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-400/70 focus:bg-white/10"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-white/60 text-sm mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-400/70 focus:bg-white/10"
                required
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-white/60 text-sm mb-3">Register as</p>
            <div className="flex flex-wrap gap-3">
              <label className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111118] px-4 py-3 cursor-pointer transition hover:border-amber-400/50">
                <input
                  type="radio"
                  name="role"
                  value="guest"
                  checked={role === "guest"}
                  onChange={() => setRole("guest")}
                  className="accent-amber-400"
                />
                <span className="text-white/70 text-sm">Guest</span>
              </label>
              <label className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111118] px-4 py-3 cursor-pointer transition hover:border-amber-400/50">
                <input
                  type="radio"
                  name="role"
                  value="host"
                  checked={role === "host"}
                  onChange={() => setRole("host")}
                  className="accent-amber-400"
                />
                <span className="text-white/70 text-sm">Host</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-amber-400 py-3 text-black font-semibold uppercase tracking-widest shadow-[0_14px_50px_rgba(251,191,36,0.2)] transition hover:bg-amber-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-white/50 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-300 hover:text-amber-200 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

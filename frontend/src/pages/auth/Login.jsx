import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(email, password);
    if (result?.error) {
      setError(result.error);
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-4xl border border-white/3 p-8 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl">
        <div className="text-center mb-8">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase mb-3">Login</p>
          <h1 className="text-4xl font-semibold text-white">Welcome Back</h1>
          <p className="text-white/50 mt-3 text-sm">Sign in to continue to your dashboard.</p>
        </div>

        {error ? <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200 mb-6">{error}</div> : null}

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            className="w-full rounded-2xl bg-amber-400 py-3 text-black font-semibold uppercase tracking-widest shadow-[0_14px_50px_rgba(251,191,36,0.2)] transition hover:bg-amber-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-white/50 mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-amber-300 hover:text-amber-200 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

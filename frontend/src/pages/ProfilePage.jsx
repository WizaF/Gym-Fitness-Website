import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-4xl border border-white/3 p-10 text-center shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase mb-3">Profile</p>
          <h1 className="text-4xl font-semibold text-white mb-4">You are not signed in</h1>
          <p className="text-white/60 mb-8">Please log in to see your profile and account details.</p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-6 py-3 text-black font-semibold uppercase tracking-widest hover:bg-amber-300 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase mb-3">User Dashboard</p>
          <h1 className="text-5xl md:text-6xl text-white font-light" style={{ fontFamily: "'Georgia', serif" }}>
            Welcome back, <span className="italic text-amber-300">{user.name}</span>
          </h1>
          <p className="text-white/40 mt-4 text-base max-w-2xl mx-auto leading-relaxed">
            Here is your profile summary. Your account is active and your role is <span className="text-amber-300">{user.role}</span>.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-10 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-8">
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <h2 className="text-xl text-amber-300 mb-5">Personal Information</h2>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <span className="text-white/40">Name</span>
                  <span className="text-white">{user.name}</span>
                  <span className="text-white/40">Email</span>
                  <span className="text-white">{user.email}</span>
                  <span className="text-white/40">Role</span>
                  <span className="text-white capitalize">{user.role}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <h2 className="text-xl text-violet-300 mb-5">Account Details</h2>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <span className="text-white/40">Account Status</span>
                  <span className="text-white">Active</span>
                  <span className="text-white/40">Member Since</span>
                  <span className="text-white">Today</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm hover:scale-105 transition-all duration-500">
                <img
                  src="https://cdn.dribbble.com/users/5046932/screenshots/14668585/media/388dfd90d68b7e94005a22478bf093f7.gif"
                  alt="Profile"
                  className="w-[320px] rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

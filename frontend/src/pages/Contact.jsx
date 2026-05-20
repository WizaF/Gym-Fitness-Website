import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-all duration-300 text-sm ${
      focused === field
        ? "border-amber-400/80 bg-white/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
        : "border-white/10 hover:border-white/25"
    }`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden font-sans">
      {/* Ambient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase font-medium mb-4">
            Get In Touch
          </p>
          <h1
            className="text-5xl md:text-7xl font-light text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            Let's <span className="italic text-amber-300">talk</span>
          </h1>
          <p className="text-white/40 text-base max-w-md mx-auto leading-relaxed">
            Have a question or a project in mind? We'd love to hear from you.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Address */}
            <InfoCard
              icon={<PinIcon />}
              label="Address"
              value="AB4 101, Delhi Technological University"
              accent="amber"
            />
            {/* Phone */}
            <InfoCard
              icon={<PhoneIcon />}
              label="Phone"
              value="9968811069"
              href="tel:9968811069"
              accent="violet"
            />
            {/* Email */}
            <InfoCard
              icon={<MailIcon />}
              label="Email"
              value="dildhariwal02@gmail.com"
              href="mailto:dildhariwal02@gmail.com"
              accent="rose"
            />

            {/* Decorative quote */}
            <div className="mt-2 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <p className="text-white/25 text-xs leading-relaxed italic">
                "We usually respond within 24 hours. Looking forward to connecting with you."
              </p>
              <div className="mt-4 flex gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-400/50" />
                <div className="w-1 h-1 rounded-full bg-amber-400/30" />
                <div className="w-1 h-1 rounded-full bg-amber-400/15" />
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 relative overflow-hidden">
              {/* top shine */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <p className="text-white text-lg font-light">Message sent!</p>
                  <p className="text-white/40 text-sm">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-white/40 text-xs tracking-widest uppercase">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Arnold Singh Schwarzenegger"
                        className={inputClass("name")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white/40 text-xs tracking-widest uppercase">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="arnold@example.com"
                        className={inputClass("email")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-xs tracking-widest uppercase">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      placeholder="What's this about?"
                      className={inputClass("subject")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-xs tracking-widest uppercase">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell us what's on your mind..."
                      className={`${inputClass("message")} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all duration-200 text-black text-sm font-semibold tracking-wide flex items-center justify-center gap-2 group shadow-[0_0_40px_rgba(251,191,36,0.25)]"
                  >
                    Send Message
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, href, accent }) {
  const accents = {
    amber: "bg-amber-400/10 border-amber-400/20 text-amber-400",
    violet: "bg-violet-400/10 border-violet-400/20 text-violet-400",
    rose: "bg-rose-400/10 border-rose-400/20 text-rose-400",
  };

  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-white/6 bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group">
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${accents[accent]}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-0.5">{label}</p>
        <p className="text-white/80 text-sm truncate group-hover:text-white transition-colors">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

function PinIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
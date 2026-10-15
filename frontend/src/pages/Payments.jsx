import React, { useEffect, useState } from "react";

export default function Payments() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/store/plans`);
        const data = await response.json();
        setPlans(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const accents = [
    { border: "hover:border-amber-400/40", badge: "bg-amber-400/10 text-amber-300 border-amber-400/20", btn: "bg-amber-400 hover:bg-amber-300", glow: "rgba(251,191,36,0.08)" },
    { border: "hover:border-violet-400/40", badge: "bg-violet-400/10 text-violet-300 border-violet-400/20", btn: "bg-violet-400 hover:bg-violet-300", glow: "rgba(167,139,250,0.08)" },
    { border: "hover:border-rose-400/40",   badge: "bg-rose-400/10 text-rose-300 border-rose-400/20",     btn: "bg-rose-400 hover:bg-rose-300",   glow: "rgba(251,113,133,0.08)" },
    { border: "hover:border-teal-400/40",   badge: "bg-teal-400/10 text-teal-300 border-teal-400/20",     btn: "bg-teal-400 hover:bg-teal-300",   glow: "rgba(45,212,191,0.08)" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase font-medium mb-4">
            Membership Plans
          </p>
          <h1
            className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            Choose your <span className="italic text-amber-300">journey</span>
          </h1>
          <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
            Flexible plans built for every goal. No hidden fees, just results.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-400/50 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {/* Plans grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {plans.map((plan, i) => {
              const accent = accents[i % accents.length];
              return (
                <div
                  key={plan._id}
                  className={`group relative rounded-2xl border border-white/8 bg-white/[0.025] flex flex-col overflow-hidden transition-all duration-300 ${accent.border} hover:bg-white/[0.045]`}
                >
                  {/* Top shine */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  {/* Image */}
                  {plan.image && (
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={plan.image}
                        alt={plan.planType}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-5 gap-4">
                    {/* Plan type badge */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${accent.badge}`}>
                        {plan.planType}
                      </span>
                      <span className="text-white/25 text-xs">{plan.duration} mo</span>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-white/40 text-sm">₹</span>
                        <span className="text-white text-3xl font-light" style={{ fontFamily: "'Georgia', serif" }}>
                          {plan.amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-white/25 text-xs mt-0.5">
                        ₹{Math.round(plan.amount / plan.duration).toLocaleString("en-IN")} / month
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-white/45 text-xs leading-relaxed flex-1">{plan.introduction}</p>

                    {/* CTA */}
                    <button
                      className={`w-full py-2.5 rounded-xl text-black text-xs font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] ${accent.btn}`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && plans.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/20 text-sm">No plans available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
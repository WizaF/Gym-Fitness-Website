import React from "react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden font-sans">

      {/* Ambient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase mb-3">
            User Dashboard
          </p>

          <h1
            className="text-5xl md:text-6xl text-white font-light"
            style={{
              fontFamily: "'Georgia', serif",
            }}
          >
            Profile <span className="italic text-amber-300">Area</span>
          </h1>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-10 shadow-[0_0_50px_rgba(255,255,255,0.03)]">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div className="space-y-8">

              {/* Personal */}
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">

                <h2 className="text-xl text-amber-300 mb-5">
                  Personal Area
                </h2>

                <div className="grid grid-cols-2 gap-y-4">

                  <h3 className="text-white/40">
                    Name
                  </h3>

                  <h3 className="text-white">
                    Dilwinder Singh
                  </h3>

                  <h3 className="text-white/40">
                    Gender
                  </h3>

                  <h3 className="text-white">
                    Male
                  </h3>

                </div>
              </div>

              {/* Health */}
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">

                <h2 className="text-xl text-violet-300 mb-5">
                  Health Area
                </h2>

                <div className="grid grid-cols-2 gap-y-4">

                  <h3 className="text-white/40">
                    Weight
                  </h3>

                  <h3 className="text-white">
                    90 kgs
                  </h3>

                  <h3 className="text-white/40">
                    Height
                  </h3>

                  <h3 className="text-white">
                    5'11"
                  </h3>

                  <h3 className="text-white/40">
                    Focuses on
                  </h3>

                  <h3 className="text-white">
                    Weight Training
                  </h3>

                </div>
              </div>

            </div>

            {/* Right image */}
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
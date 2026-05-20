import React from "react";
import './Schedule.css';

export default function Schedule() {
  return (
    <section className="min-h-screen bg-[#0a0a0f] relative overflow-hidden px-6 py-16">
      {/* Main container */}
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">
            Workout
          </p>

          <h2 className="text-3xl text-white font-light">Today's Schedule</h2>

          <h3 className="text-white/50 mt-2 mb-8">Chest Day</h3>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Exercise 1 */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <img
                src="https://cdn.dribbble.com/users/398490/screenshots/2039177/media/932553d50640a7c44bde0b43abee456a.gif"
                alt="Bench Press"
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <p className="text-white">Flat Bench Press</p>
              </div>
            </div>

            {/* Exercise 2 */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <img
                src="https://cdn.shopify.com/s/files/1/1501/0558/files/InclineBenchPress.gif?v=1507564443"
                alt="Incline Press"
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <p className="text-white">Incline Bench Press</p>
              </div>
            </div>
          </div>

          <a className="mt-8 w-full py-3 rounded-xl bg-amber-400 text-black font-medium hover:bg-amber-300 active:scale-[0.98] transition-all flex justify-center items-center gap-2" href="/continue-workout">
            Continue Workout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 
                5.354a.5.5 0 1 1 .708-.708l3 
                3a.5.5 0 0 1 0 .708l-3 
                3a.5.5 0 0 1-.708-.708L10.293 
                8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </a>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6">
            <h2 className="text-violet-300 text-xl mb-5">Progress</h2>

            <div className="space-y-3">
              <p className="text-white">
                Weight:
                <span className="text-white/50 ml-2">70kgs</span>
              </p>

              <p className="text-white">
                BMI:
                <span className="text-white/50 ml-2">21.6</span>
              </p>
            </div>
          </div>

          {/* Attendance */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6">
            <h3 className="text-rose-300 mb-5">Mark Attendance</h3>

            <button className="w-full py-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition-all">
              Click Here
            </button>
          </div>

          {/* Occupancy */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 flex items-center gap-5">
            <div className="w-24 h-24 rounded-full border-4 border-amber-400 flex items-center justify-center">
              <h1 className="text-2xl text-white font-bold">80%</h1>
            </div>

            <div>
              <h2 className="text-white text-lg">Gym Occupancy</h2>

              <p className="text-white/40 text-sm">Real-time crowd status</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

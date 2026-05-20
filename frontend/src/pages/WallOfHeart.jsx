import React, { useState, useEffect } from "react";

// const ytComments = [
//   {
//     id: 1,
//     name: "Meera Joshi",
//     avatar: "MJ",
//     content:
//       "Your beginner's guide video literally changed how I think about training. Watched it 4 times already!",
//     likes: 342,
//     color: "bg-red-400/15 text-red-300",
//   },
//   {
//     id: 2,
//     name: "Arjun Kapoor",
//     avatar: "AK",
//     content:
//       "The form breakdown at 4:20 in the squat tutorial is GOLD. Nobody explains it like this. Subscribed immediately.",
//     likes: 218,
//     color: "bg-amber-400/15 text-amber-300",
//   },
//   {
//     id: 3,
//     name: "Divya Menon",
//     avatar: "DM",
//     content:
//       "Been following #jimBroCode on YouTube for a year now. The consistency of quality is remarkable. Keep going!",
//     likes: 189,
//     color: "bg-violet-400/15 text-violet-300",
//   },
// ];

export default function WallOfHeart() {
  const [tweets, setTweets] = useState([]);
  const [ytComments, setYtComments] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/store/tweets`);
        const data = await response.json();
        setTweets(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTweets();
  }, []);

  const fetchYtComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/store/comments`);
      const data = await response.json();
      setYtComments(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchYtComments();
  }, []);

  const color = "bg-red-400/15 text-red-300";

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase font-medium mb-4">
            Community Love
          </p>
          <h1
            className="text-5xl md:text-6xl font-light text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            Wall of <span className="italic text-rose-400">Heart</span> 💘
          </h1>
          <p className="text-white/35 text-sm max-w-xl mx-auto leading-relaxed">
            Jim Bro Code has been around since 2023. We've been lucky enough to
            serve our community. Here are some of the recent social media
            mentions about us. Want to get listed here? Share your experience
            with the hashtag{" "}
            <span className="text-amber-400/80 font-medium">#jimBroCode</span>
          </p>
        </div>

        {/* X (Twitter) Section */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
              <svg
                className="w-4 h-4 text-white/70"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
              <span className="text-white/60 text-xs font-medium tracking-wide">
                Posts
              </span>
            </div>
            <div className="flex-1 h-px bg-white/6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tweets.map((t) => (
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:bg-white/[0.05] hover:border-white/12 transition-all duration-300 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${t.accent}`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium leading-none">
                        {t.name}
                      </p>
                      <p className="text-white/35 text-xs mt-0.5">
                        {t.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-white/25"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                    </svg>
                    <span className="text-white/20 text-xs">{t.time}</span>
                  </div>
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  {t.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
              <svg
                className="w-4 h-4 text-red-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="text-white/60 text-xs font-medium tracking-wide">
                Comments
              </span>
            </div>
            <div className="flex-1 h-px bg-white/6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ytComments.map((c) => (
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:bg-white/[0.05] hover:border-white/12 transition-all duration-300 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${color}`}
                  >
                    {c.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <p className="text-white/90 text-sm font-medium">{c.name}</p>
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  {c.comment}
                </p>
                <div className="flex items-center gap-1.5 mt-auto">
                  <svg
                    className="w-3.5 h-3.5 text-white/25"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V2.75a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904"
                    />
                  </svg>
                  <span className="text-white/30 text-xs">{c.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-400/20 bg-amber-400/5 text-amber-400/80 text-sm">
            <span>Share your story with</span>
            <span className="font-semibold text-amber-400">#jimBroCode</span>
            <span>to get featured here</span>
          </div>
        </div>
      </div>
    </div>
  );
}

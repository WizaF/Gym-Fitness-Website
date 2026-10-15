import React from "react";

export default function Home() {
  const videoSource = "../public/Cbum.mp4"; // Update the path to your video file
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-6xl font-bold">Jim Bro Code</h1>

        <p className="mt-4 text-xl text-white/70">Transform your physique</p>
      </div>
    </div>
  );
}

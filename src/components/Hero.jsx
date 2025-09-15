// Hero.jsx
import React, { useRef } from "react";
import TrailCanvas from "./TrailCanvas";
import MusicVisualizer from "./MusicVisualizer";

const Hero = () => {
  const audioRef = useRef(null); // For future real audio connection

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900">
      {/* Trail background */}
      <TrailCanvas />

      {/* Music visualizer mid-layer */}
      <MusicVisualizer />

      {/* Foreground content */}
      <h1 className="text-6xl font-bold text-white z-20 relative text-center">
        HR Crew Music Studio
      </h1>

      {/* Optional audio controls */}
      <audio
        ref={audioRef}
        src="/audio/sample.mp3"
        controls
        className="mt-5 z-20 relative"
      />
    </div>
  );
};

export default Hero;

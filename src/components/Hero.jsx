import React, { useRef } from "react";
import { motion } from "framer-motion";
import MusicVisualizer from "./MusicVisualizer";
import TrailCanvas from "./TrailCanvas";

const Hero = () => {
  const textRef = useRef(null);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-900"
    >
      {/* Trail background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <TrailCanvas />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-20" />

      {/* Music visualizer (dynamic height) */}
      <MusicVisualizer textRef={textRef} />

      {/* Foreground content */}
      <motion.div
        ref={textRef}
        className="relative text-center z-40 w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            HR CREW
          </span>
          <br className="hidden sm:block" /> MUSIC STUDIO
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Where creativity meets technology 🎶
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;

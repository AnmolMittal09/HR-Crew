// Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import MusicVisualizer from "./MusicVisualizer";
import TrailCanvas from "./TrailCanvas";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Background visualizers pinned to Hero */}
      <div className="absolute inset-0 z-20">
        <MusicVisualizer />
        <TrailCanvas />
      </div>

      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black/60 z-30" />

      {/* Foreground content */}
      <motion.div
        className="relative text-center z-40 px-4 sm:px-6 md:px-8"
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

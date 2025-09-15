// Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import MusicVisualizer from "./MusicVisualizer";
import TrailCanvas from "./TrailCanvas";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <MusicVisualizer />
      <TrailCanvas />

      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black/60 z-30" />

      {/* Foreground content */}
      <motion.div
        className="relative text-center z-40 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            HR CREW
          </span>
          <br /> MUSIC STUDIO
        </h1>
        <p className="mt-6 text-gray-300 text-xl">Where creativity meets technology 🎶</p>
      </motion.div>
    </section>
  );
};

export default Hero;

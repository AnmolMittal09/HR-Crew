import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const Hero = forwardRef(({ musicCanvasRef, trailCanvasRef }, ref) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={musicCanvasRef} className="absolute inset-0 z-10" />
      <canvas ref={trailCanvasRef} className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-20" />
      <div className="absolute inset-0 bg-black/60 z-30" />
      <motion.div className="relative text-center z-40" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h1 className="text-6xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            HR CREW
          </span>
          <br /> MUSIC STUDIO
        </h1>
        <p className="mt-6 text-gray-300 text-xl">Where creativity meets technology 🎶</p>
      </motion.div>
    </section>
  );
});

export default Hero;

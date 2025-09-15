import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Artists = ({ spotifyData }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);

  const isDesktop = typeof window !== "undefined" ? window.innerWidth > 768 : true;

  // Gyroscopic effect only on desktop
  const rotateY = isDesktop ? useTransform(mouseX, [0, window.innerWidth], [-15, 15]) : 0;

  return (
    <div
      ref={containerRef}
      className="py-12 bg-gray-900"
      onMouseMove={(e) => {
        if (isDesktop) mouseX.set(e.clientX);
      }}
    >
      <motion.div
        className="flex gap-6 md:gap-10 justify-center overflow-x-auto md:overflow-x-visible px-4"
        style={{ rotateY }}
      >
        {spotifyData.map((artist) => (
          <motion.a
            key={artist.id}
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={artist.images[0]?.url || "/placeholder.png"}
              alt={artist.name}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 object-cover rounded-full border-2 border-green-400 shadow-lg"
            />
            <h3 className="mt-2 text-sm sm:text-base md:text-lg font-semibold text-center text-white">
              {artist.name}
            </h3>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Artists;

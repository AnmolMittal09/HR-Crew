import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Artists = ({ spotifyData }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);

  // Transform the mouse position to a rotation for gyroscopic effect
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);

  return (
    <div
      ref={containerRef}
      className="py-12 bg-gray-900 flex justify-center"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
      }}
    >
      <motion.div
        className="flex gap-10"
        style={{ rotateY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {spotifyData.map((artist) => (
          <motion.a
            key={artist.id}
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={artist.images[0]?.url || "/placeholder.png"}
              alt={artist.name}
              className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-full border-2 border-green-400 shadow-lg"
            />
            <h3 className="mt-3 text-lg font-semibold text-center text-white">
              {artist.name}
            </h3>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Artists;

import React from "react";
import { motion } from "framer-motion";

const Artists = ({ spotifyData }) => {
  // Duplicate array for seamless looping
  const scrollingArtists = [...spotifyData, ...spotifyData];

  const rowTransition = {
    repeat: Infinity,
    repeatType: "loop",
    duration: 25,
    ease: "linear",
  };

  return (
    <div className="overflow-hidden py-12 bg-gray-900">
      {/* First row */}
      <motion.div
        className="flex gap-10 mb-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={rowTransition}
      >
        {scrollingArtists.map((artist, index) => (
          <motion.a
            key={`row1-${index}`}
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1, opacity: 1 }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1 }}
          >
            <img
              src={artist.images[0]?.url || "/placeholder.png"}
              alt={artist.name}
              className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-full border-2 border-green-400 shadow-lg"
            />
            <h3 className="mt-3 text-lg font-semibold text-center">{artist.name}</h3>
          </motion.a>
        ))}
      </motion.div>

      {/* Second row (slightly offset, speed can differ for cinematic effect) */}
      <motion.div
        className="flex gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ...rowTransition, duration: 28 }}
      >
        {scrollingArtists.map((artist, index) => (
          <motion.a
            key={`row2-${index}`}
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1, opacity: 1 }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1 }}
          >
            <img
              src={artist.images[0]?.url || "/placeholder.png"}
              alt={artist.name}
              className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-full border-2 border-green-400 shadow-lg"
            />
            <h3 className="mt-3 text-lg font-semibold text-center">{artist.name}</h3>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Artists;

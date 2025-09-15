import React from "react";
import { motion } from "framer-motion";

const Artists = ({ spotifyData }) => {
  // Duplicate array for seamless looping
  const scrollingArtists = [...spotifyData, ...spotifyData];

  return (
    <div className="overflow-hidden py-12 bg-gray-900">
      <motion.div
        className="flex gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 25, // slower for better readability
          ease: "linear",
        }}
      >
        {scrollingArtists.map((artist, index) => (
          <motion.a
            key={index}
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
              className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-2 border-green-400 shadow-lg"
            />
            <h3 className="mt-3 text-lg font-semibold text-center">{artist.name}</h3>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Artists;

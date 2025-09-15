import React from "react";
import { motion } from "framer-motion";

const Artists = ({ spotifyData }) => {
  // Duplicate the array for seamless infinite scroll
  const scrollingArtists = [...spotifyData, ...spotifyData];

  return (
    <div className="overflow-hidden py-8 bg-gray-900">
      <motion.div
        className="flex gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {scrollingArtists.map((artist, index) => (
          <a
            key={index}
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <img
              src={artist.images[0]?.url || "/placeholder.png"}
              alt={artist.name}
              className="w-24 h-24 object-cover rounded-full border-2 border-green-400 shadow-lg"
            />
            <h3 className="mt-2 text-sm font-semibold text-center">{artist.name}</h3>
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default Artists;

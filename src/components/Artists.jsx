import React from "react";
import { motion } from "framer-motion";

const Artists = ({ spotifyData }) => {
  // Duplicate the array enough times for seamless loop
  const scrollingArtists = [...spotifyData, ...spotifyData];

  return (
    <div className="overflow-hidden py-12 bg-gray-900">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        }}
      >
        {scrollingArtists.map((artist, index) => (
          <motion.a
            key={index}
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center flex-shrink-0"
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: index * 0.2,
            }}
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

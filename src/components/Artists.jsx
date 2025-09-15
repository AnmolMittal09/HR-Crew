import React from "react";
import { motion } from "framer-motion";

const Artists = ({ spotifyData }) => {
  return (
    <div className="overflow-x-auto py-12 bg-gray-900 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800 cursor-grab">
      <motion.div
        className="flex gap-10"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        whileTap={{ cursor: "grabbing" }}
      >
        {spotifyData.map((artist) => (
          <motion.a
            key={artist.id}
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center flex-shrink-0"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={artist.images[0]?.url || "/placeholder.png"}
              alt={artist.name}
              className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-full border-2 border-green-400 shadow-lg"
            />
            <h3 className="mt-3 text-lg font-semibold text-center text-white">{artist.name}</h3>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Artists;

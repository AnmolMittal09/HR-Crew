import React from "react";
import { motion } from "framer-motion";

const Artists = ({ spotifyData }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 px-4 md:px-16 py-8">
      {spotifyData.map((artist, index) => (
        <motion.a
          key={artist.id}
          href={artist.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
        >
          <img
            src={artist.images[0]?.url || "/placeholder.png"}
            alt={artist.name}
            className="w-32 h-32 object-cover rounded-full border-2 border-green-400 shadow-lg hover:scale-105 transition-transform"
          />
          <h3 className="mt-3 text-lg font-semibold text-center">{artist.name}</h3>
        </motion.a>
      ))}
    </div>
  );
};

export default Artists;

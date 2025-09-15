import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const Artists = ({ spotifyData }) => {
  const containerRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(2);

  // Dynamically calculate repeats for seamless loop
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const logoWidth = 160 + 40; // approx logo width + gap
      const requiredRepeats = Math.ceil(containerWidth / (spotifyData.length * logoWidth)) + 1;
      setRepeatCount(requiredRepeats);
    }
  }, [spotifyData]);

  const scrollingArtists = Array(repeatCount)
    .fill(spotifyData)
    .flat();

  return (
    <div ref={containerRef} className="overflow-hidden py-12 bg-gray-900">
      <motion.div
        className="flex gap-10 w-max"
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
            whileHover={{ scale: 1.1 }} // subtle zoom on hover
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: (index % spotifyData.length) * 0.2,
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

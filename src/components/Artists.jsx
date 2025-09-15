import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Artists = ({ spotifyData }) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [logos, setLogos] = useState([]);

  // Duplicate logos for seamless looping
  useEffect(() => {
    setLogos([...spotifyData, ...spotifyData, ...spotifyData]);
  }, [spotifyData]);

  // Track container width
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [logos]);

  // Handle repositioning logos for infinite effect
  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      const totalWidth = logos.length * 200; // approx logo + gap
      if (latest <= -totalWidth / 3) {
        x.set(latest + totalWidth / 3);
      } else if (latest >= 0) {
        x.set(latest - totalWidth / 3);
      }
    });
    return () => unsubscribe();
  }, [x, logos]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden py-12 bg-gray-900 cursor-grab"
    >
      <motion.div
        className="flex gap-10"
        style={{ x }}
        drag="x"
        dragElastic={0.15}
        dragConstraints={{ left: 0, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {logos.map((artist, index) => (
          <motion.a
            key={index + artist.id} // unique key
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
            <h3 className="mt-3 text-lg font-semibold text-center">{artist.name}</h3>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Artists;

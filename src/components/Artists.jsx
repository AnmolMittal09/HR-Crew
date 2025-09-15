import React from "react";
import { motion } from "framer-motion";
import Artist1Img from "../assets/artist1.jpg";
import Artist2Img from "../assets/artist2.jpg";
import Artist3Img from "../assets/artist3.jpg";

const Artists = () => {
  const artists = [
    { name: "Yash Prajapat", genre: "Haryanvi Fusion", img: Artist1Img },
    { name: "Masoom Sharma", genre: "Hip-Hop / Rap", img: Artist2Img },
    { name: "HR Crew", genre: "Studio Production", img: Artist3Img },
  ];

  return (
    <section id="artists" className="py-20 bg-gray-900 text-center">
      <h2 className="text-4xl font-bold mb-6">Featured Artists</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {artists.map((artist, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-gray-800 p-6 rounded-lg transition-transform duration-500">
            <img src={artist.img} alt={artist.name} className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="font-bold">{artist.name}</h3>
            <p className="text-gray-400">{artist.genre}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Artists;

import React from "react";
import { motion } from "framer-motion";

const OwnerCard = ({ img, name, role, delay = 0 }) => {
  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, delay }}
    >
      <div className="relative w-64 h-64">
        <img
          src={img}
          alt={name}
          className="rounded-full w-64 h-64 object-cover border-4 border-cyan-400 shadow-lg"
        />
      </div>
      <h3 className="mt-4 text-xl font-bold">{name}</h3>
      <p className="text-gray-400 text-center max-w-xs mt-2">{role}</p>
    </motion.div>
  );
};

export default OwnerCard;

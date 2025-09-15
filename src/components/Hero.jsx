import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white"
    >
      <motion.div
        className="relative text-center z-40"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            HR CREW
          </span>
          <br /> MUSIC STUDIO
        </h1>
        <p className="mt-6 text-gray-300 text-xl">
          Where creativity meets technology 🎶
        </p>
      </motion.div>
    </section>
  );
}

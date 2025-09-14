import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Menu, X } from "lucide-react";

// Images
import AnmolImg from "./assets/anmol.jpg";
import HarshImg from "./assets/harsh.jpg";
import Artist1Img from "./assets/artist1.jpg";
import Artist2Img from "./assets/artist2.jpg";
import Artist3Img from "./assets/artist3.jpg";

// Owner Card Component
const OwnerCard = ({ img, name, role, delay = 0 }) => (
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

const HRCrewMusicStudio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const musicCanvasRef = useRef(null);
  const trailCanvasRef = useRef(null);
  const trailParticles = useRef([]);

  // Active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "artists", "contact"];
      const scrollPos = window.scrollY + 100;
      for (let s of sections) {
        const el = document.getElementById(s);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(s);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false); // close mobile menu after click
  };

  // Music Visualizer
  useEffect(() => {
    const canvas = musicCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const bars = Array.from({ length: 80 }, () => Math.random() * 100);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bars.length;

      bars.forEach((h, i) => {
        bars[i] += Math.random() * 10 - 5;
        if (bars[i] > 100) bars[i] = 100;
        if (bars[i] < 10) bars[i] = 10;

        const x = i * barWidth;
        const barHeight = (bars[i] / 100) * (canvas.height / 2);

        const gradient = ctx.createLinearGradient(x, canvas.height - barHeight, x, canvas.height);
        gradient.addColorStop(0, "#ff00ff");
        gradient.addColorStop(1, "#00ffff");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Sparkle Trail
  useEffect(() => {
    const canvas = trailCanvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      trailParticles.current.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 2,
        alpha: 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailParticles.current.forEach((p, i) => {
        const colors = ["#06b6d4", "#a855f7", "#ff00ff", "#00ffff"];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) trailParticles.current.splice(i, 1);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const artists = [
    { name: "Yash Prajapat", genre: "Haryanvi Fusion", img: Artist1Img },
    { name: "Masoom Sharma", genre: "Hip-Hop / Rap", img: Artist2Img },
    { name: "HR Crew", genre: "Studio Production", img: Artist3Img },
  ];

  return (
    <div className="bg-gray-900 text-white relative">
      {/* Navbar */}
      <nav className="fixed w-full bg-black bg-opacity-70 backdrop-blur-md z-50">
        <div className="flex items-center w-full px-6 py-3">
          {/* Logo */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            HR CREW
          </h1>

          {/* Desktop Nav */}
          <div className="ml-auto hidden md:flex space-x-6">
            {["home", "about", "artists", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`${
                  activeSection === item
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400"
                } uppercase`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="ml-auto md:hidden text-white z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu with Slide & Blur */}
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: menuOpen ? 0 : -200, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:hidden fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md flex flex-col items-center py-6 space-y-4 z-40"
        >
          {["home", "about", "artists", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`${
                activeSection === item
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400"
              } uppercase text-lg font-semibold`}
            >
              {item}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <canvas ref={musicCanvasRef} className="absolute inset-0 z-10" />
        <canvas
          ref={trailCanvasRef}
          className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-20"
        />
        <div className="absolute inset-0 bg-black/60 z-30" />
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

      {/* About */}
      <section id="about" className="py-20 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-10">About Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          <OwnerCard
            img={AnmolImg}
            name="Anmol Mittal"
            role="Co-founder & Music Producer"
          />
          <OwnerCard
            img={HarshImg}
            name="Harsh Goyal"
            role="Co-founder & Studio Manager"
            delay={0.3}
          />
        </div>
      </section>

      {/* Artists */}
      <section id="artists" className="py-20 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-6">Featured Artists</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {artists.map((artist, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg transition-transform duration-500"
            >
              <img
                src={artist.img}
                alt={artist.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="font-bold">{artist.name}</h3>
              <p className="text-gray-400">{artist.genre}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <div className="space-y-4">
          <p className="flex items-center justify-center">
            <MapPin className="mr-2" /> 123 Music Avenue
          </p>
          <p className="flex items-center justify-center">
            <Phone className="mr-2" /> 9717155406 , 7048998256
          </p>
          <p className="flex items-center justify-center">
            <Mail className="mr-2" /> info@hrcrew.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default HRCrewMusicStudio;

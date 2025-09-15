import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Artists from "./components/Artists";
import Contact from "./components/Contact";

const HRCrewMusicStudio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const musicCanvasRef = useRef(null);
  const trailCanvasRef = useRef(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  // Scroll active section
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

  // ---------------- Music Visualizer ----------------
  useEffect(() => {
    const canvas = musicCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let bars = [];

    const initializeBars = (barCount) => {
      bars = Array.from({ length: barCount }, () => Math.random() * 50 + 30);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const barCount = window.innerWidth < 768 ? 40 : 80;
      if (bars.length !== barCount) initializeBars(barCount);
    };

    resize();
    window.addEventListener("resize", resize);

    const getFakeSpectrum = (i, total) => {
      const t = Date.now() * 0.002;
      const phase = (i / total) * Math.PI * 2;
      const low = Math.sin(t + phase) * 0.6 + 0.4;
      const mid = Math.sin(t * 1.5 + phase * 2) * 0.5 + 0.5;
      const high = Math.sin(t * 3 + phase * 4) * 0.3 + 0.7;
      return (low + mid + high) / 3;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10,10,15,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bars.length;

      bars.forEach((h, i) => {
        const spectrum = getFakeSpectrum(i, bars.length);
        const targetHeight = spectrum * 80;
        bars[i] = bars[i] + (targetHeight - bars[i]) * 0.1;

        const x = i * barWidth;
        const barHeight = (bars[i] / 100) * (canvas.height / 2);

        const gradient = ctx.createLinearGradient(
          x,
          canvas.height - barHeight,
          x,
          canvas.height
        );
        gradient.addColorStop(0, "#ff00ff");
        gradient.addColorStop(0.5, "#00ffff");
        gradient.addColorStop(1, "#06b6d4");

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

  // ---------------- Sparkle Trail ----------------
  useEffect(() => {
    const canvas = trailCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const trailParticles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addParticle = (x, y) => {
      trailParticles.push({
        x,
        y,
        size: Math.random() * 3 + 2,
        alpha: 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        color: ["#06b6d4", "#a855f7", "#ff00ff", "#00ffff"][Math.floor(Math.random() * 4)],
      });
    };

    const handleMouseMove = (e) => addParticle(e.clientX, e.clientY);
    window.addEventListener("mousemove", handleMouseMove);

    const handleTouchMove = (e) => {
      for (let touch of e.touches) {
        addParticle(touch.clientX, touch.clientY);
      }
    };
    window.addEventListener("touchmove", handleTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailParticles.forEach((p, i) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) trailParticles.splice(i, 1);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white relative overflow-x-hidden">
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Hero musicCanvasRef={musicCanvasRef} trailCanvasRef={trailCanvasRef} />
      <About />
      <Artists />
      <Contact />
    </div>
  );
};

export default HRCrewMusicStudio;

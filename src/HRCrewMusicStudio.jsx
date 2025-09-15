import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Artists from "./components/Artists";
import Contact from "./components/Contact";

const HRCrewMusicStudio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Scroll to section handler
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white relative overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Hero Section with Music Visualizer & Trail */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Featured Artists */}
      <Artists />

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default HRCrewMusicStudio;

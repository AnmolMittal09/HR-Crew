import React from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ activeSection, scrollToSection, menuOpen, setMenuOpen }) => {
  const sections = ["home", "about", "artists", "contact"];

  return (
    <nav className="fixed w-full bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div className="flex items-center w-full px-6 py-3">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          HR CREW
        </h1>

        <div className="ml-auto hidden md:flex space-x-6">
          {sections.map((item) => (
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

        {/* Mobile Menu Toggle */}
        <button className="ml-auto md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 flex flex-col items-center py-4 space-y-4">
          {sections.map((item) => (
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
      )}
    </nav>
  );
};

export default Navbar;

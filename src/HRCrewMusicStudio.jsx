import React, { useRef, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Artists from "./components/Artists";
import Contact from "./components/Contact";

const artistIds = [
  "61SDFLPIjtLsMeGPSLqbhZ",
  "7wi8IlXwOdKRyozkRKEeSr",
  "56yZJfVlHvxGyowJfihwH3",
  "4NUHbtrp2qBYd3dLcZf4wY",
];

const HRCrewMusicStudio = () => {
  const [spotifyData, setSpotifyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navbar state
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Section refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const artistsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    artists: artistsRef,
    contact: contactRef,
  };

  // Smooth scroll to section
  const scrollToSection = (section) => {
    const ref = sectionRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close mobile menu
    }
  };

  // ScrollSpy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const bottom = top + ref.current.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Spotify artists
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        setError(null);

        const responses = await Promise.all(
          artistIds.map((id) =>
            fetch(`/api/spotify?artistId=${id}`).then((res) => res.json())
          )
        );

        setSpotifyData(responses);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
        setError("Something went wrong while fetching artists");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Sections */}
      <section ref={homeRef} className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12">
        <Hero />
      </section>

      <section ref={aboutRef} className="w-full py-16 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
        <About />
      </section>

      {/* Artists Section */}
      <section ref={artistsRef} className="py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10">
          Our Artists
        </h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading artists...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Artists spotifyData={spotifyData} />
        )}
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
        <Contact />
      </section>
    </div>
  );
};

export default HRCrewMusicStudio;

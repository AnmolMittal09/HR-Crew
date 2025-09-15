import React, { useState, useEffect } from "react";
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
      <Navbar />
      <Hero />
      <About />

      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-10">Our Artists</h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading artists...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Artists spotifyData={spotifyData} />
        )}
      </section>

      <Contact />
    </div>
  );
};

export default HRCrewMusicStudio;

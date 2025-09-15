import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Artists from "./components/Artists";
import Contact from "./components/Contact";

const artistIds = [
  "2ksQOaJEKZUywWIKeeZlJK", // Example Artist
  "7wi8IlXwOdKRyozkRKEeSr",
  "56yZJfVlHvxGyowJfihwH3",
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

        // call our vercel serverless API
        const responses = await Promise.all(
          artistIds.map((id) =>
            fetch(`/api/spotify?artistId=${id}`).then((res) => res.json())
          )
        );

        setSpotifyData(responses);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="bg-gray-900 text-white relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />

      {loading ? (
        <p className="text-center text-gray-400 mt-10">Loading artists...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">
          Error fetching artists: {error}
        </p>
      ) : (
        <Artists spotifyData={spotifyData} />
      )}

      <Contact />
    </div>
  );
};

export default HRCrewMusicStudio;

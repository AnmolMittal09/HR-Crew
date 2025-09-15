import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Artists from "./components/Artists";
import Contact from "./components/Contact";

const artistIds = [
  "2ksQOaJEKZUywWIKeeZlJK",
  "7wi8IlXwOdKRyozkRKEeSr",
  "56yZJfVlHvxGyowJfihwH3",
];

const HRCrewMusicStudio = () => {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loadingToken, setLoadingToken] = useState(true);
  const [tokenError, setTokenError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoadingToken(true);
        setTokenError(null);

        const res = await fetch("http://localhost:5000/spotify-token");

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        if (data.access_token) {
          setSpotifyToken(data.access_token);
        } else {
          throw new Error("No access token returned from server");
        }
      } catch (err) {
        console.error("Failed to fetch Spotify token:", err);
        setTokenError(err.message);
      } finally {
        setLoadingToken(false);
      }
    };

    fetchToken();
  }, []);

  return (
    <div className="bg-gray-900 text-white relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      
      {loadingToken ? (
        <p className="text-center text-gray-400 mt-10">Loading artists...</p>
      ) : tokenError ? (
        <p className="text-center text-red-500 mt-10">
          Error fetching Spotify token: {tokenError}
        </p>
      ) : (
        <Artists spotifyToken={spotifyToken} artistIds={artistIds} />
      )}

      <Contact />
    </div>
  );
};

export default HRCrewMusicStudio;


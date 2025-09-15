import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";

const Artists = ({ spotifyToken, artistIds }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      if (!spotifyToken || !artistIds?.length) return;

      try {
        setLoading(true);
        setError(null);

        const fetchedArtists = await Promise.all(
          artistIds.map(async (id) => {
            const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
              headers: { Authorization: `Bearer ${spotifyToken}` },
            });
            if (!res.ok) throw new Error(`Failed to fetch artist ${id}`);
            const data = await res.json();
            return {
              name: data.name,
              img: data.images[0]?.url || "",
              spotify: data.external_urls.spotify || "",
            };
          })
        );
        setArtists(fetchedArtists);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [spotifyToken, artistIds]);

  if (loading) {
    return (
      <section id="artists" className="py-20 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-6">Featured Artists</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-gray-800 p-6 rounded-lg animate-pulse h-64 flex flex-col items-center justify-center"
            >
              <div className="w-32 h-32 bg-gray-700 rounded-full mb-4"></div>
              <div className="w-24 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-16 h-4 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="artists" className="py-20 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-6">Featured Artists</h2>
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section id="artists" className="py-20 bg-gray-900 text-center">
      <h2 className="text-4xl font-bold mb-6">Featured Artists</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {artists.map((artist, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg transition-transform duration-500 relative"
          >
            {artist.img ? (
              <img
                src={artist.img}
                alt={artist.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 rounded-lg mb-2" />
            )}
            <h3 className="font-bold">{artist.name}</h3>
            {artist.spotify && (
              <a
                href={artist.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 text-green-500 hover:text-green-400"
                title="Listen on Spotify"
              >
                <FaSpotify size={28} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Artists;

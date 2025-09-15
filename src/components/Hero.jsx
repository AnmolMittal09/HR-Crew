import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch("/api/spotify?artistId=2ksQOaJEKZUywWIKeeZlJK");
        const data = await res.json();
        setArtistData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, []);

  if (loading)
    return <div className="text-center py-20 text-white">Loading HR Crew...</div>;

  if (!artistData)
    return <div className="text-center py-20 text-white">Failed to load artist</div>;

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-cyan-400 text-white">
      {/* Artist Profile */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={artistData?.artist?.images?.[0]?.url || "/placeholder.png"}
          alt={artistData?.artist?.name || "HR Crew"}
          className="w-40 h-40 rounded-full border-4 border-white mb-4"
        />
        <h1 className="text-4xl font-bold">{artistData?.artist?.name || "HR Crew"}</h1>
        <a
          href={artistData?.artist?.external_urls?.spotify || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 px-4 py-2 bg-white text-black rounded-lg font-semibold"
        >
          View on Spotify
        </a>
      </div>

      {/* Horizontal Carousel of Tracks */}
      <motion.div
        className="flex gap-6 overflow-x-auto px-4 cursor-grab"
        whileTap={{ cursor: "grabbing" }}
      >
        {artistData?.tracks?.length > 0 ? (
          artistData.tracks.map((track) => (
            <motion.a
              key={track.id}
              href={track.external_urls?.spotify || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-56 sm:w-64 md:w-72 bg-black bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition"
            >
              <img
                src={track.album?.images?.[0]?.url || "/placeholder.png"}
                alt={track.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <p className="font-semibold text-white">{track.name}</p>
              <p className="text-sm text-gray-300">{track.album?.name}</p>
            </motion.a>
          ))
        ) : (
          <p className="text-white">No tracks available</p>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;

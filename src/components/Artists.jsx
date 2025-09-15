import React from "react";

const Artists = ({ spotifyData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-16">
      {spotifyData.map((artist) => (
        <div
          key={artist.id}
          className="bg-gray-800 rounded-xl p-4 text-center hover:scale-105 transition-transform"
        >
          <img
            src={artist.images[0]?.url || "/placeholder.png"}
            alt={artist.name}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
          <p className="text-gray-400">
            Followers: {artist.followers?.total.toLocaleString()}
          </p>
          <a
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-green-400 hover:underline"
          >
            View on Spotify
          </a>
        </div>
      ))}
    </div>
  );
};

export default Artists;

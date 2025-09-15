import React from "react";

const Artists = ({ spotifyData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-16">
      {spotifyData.map((artist) => (
        <div
          key={artist.id}
          className="bg-gray-800 rounded-xl p-4 text-center hover:scale-105 transition-transform"
        >
          <a
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={artist.images[0]?.url || "/placeholder.png"}
              alt={artist.name}
              className="w-full h-56 object-cover rounded-lg mb-4 hover:opacity-90 transition-opacity"
            />
          </a>
          <h3 className="text-xl font-semibold">{artist.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Artists;

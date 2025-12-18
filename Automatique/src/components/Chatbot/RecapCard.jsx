import React from "react";

export default function RecapCard({ nom, contact, lieux, mapUrl }) {
  return (
    <div className="bg-[#3a3a3a] rounded-xl p-6 w-full  min-w-2xs text-white shadow-lg mt-2">
      <div className="mb-2">
        <label className="block text-gray-300 text-xs mb-1">Nom</label>
        <div className="bg-[#222] rounded px-3 py-2 mb-2">{nom}</div>
      </div>
      <div className="mb-2">
        <label className="block text-gray-300 text-xs mb-1">Contact</label>
        <div className="bg-[#222] rounded px-3 py-2 mb-2">{contact}</div>
      </div>
      <div className="mb-2">
        <label className="block text-gray-300 text-xs mb-1">Lieu signalé</label>
        <div className="bg-[#222] rounded px-3 py-2 mb-2">{lieux}</div>
      </div>
      <div>
        <img
          src={mapUrl}
          alt="Carte"
          className="w-full h-32 object-cover rounded"
        />
      </div>
    </div>
  );
} 
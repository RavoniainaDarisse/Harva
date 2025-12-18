import React from "react";

export default function RedModal({ open, onClose, children }) {
  if (!open) return null;
  return (
    
    <div
      className="fixed inset-0 z-[9999] bg-[#252525] flex items-center justify-center"
      onDoubleClick={onClose}
    >
      <div className="w-full h-full flex items-center justify-center">
        {children || (
          <div className="text-white text-2xl font-bold">
            Modale rouge (double-clique pour fermer)
          </div>
        )}
      </div>
    </div>
  );
} 
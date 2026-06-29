import React from "react";

const ScrimCard = ({ slot }) => {
  return (
    <div
      className="relative border border-[#06B6D4] hover:border-[#06B6D4]/60 rounded-xl p-4 text-center text-white overflow-hidden group shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300"
      style={{
        backgroundImage: `url(${slot.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 rounded-xl"></div>
      <div className="relative z-10">
        <p className="text-lg font-semibold mb-2 drop-shadow-md font-[Orbitron]">
          {slot.time}
        </p>
        <ul className="text-sm mb-4 space-y-1 drop-shadow-sm text-gray-300">
          {slot.maps.map((map, i) => (
            <li key={i}>{map}</li>
          ))}
        </ul>
        <button className="border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white px-4 py-2 rounded-md transition-all duration-300 text-sm font-semibold">
          Register Scrim
        </button>
      </div>
    </div>
  );
};

export default ScrimCard;

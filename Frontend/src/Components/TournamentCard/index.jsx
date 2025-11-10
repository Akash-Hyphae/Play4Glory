// src/components/TournamentSection/TournamentCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const TournamentCard = ({ data, registerText = "Register" }) => {
  const navigate = useNavigate();

  // Parse players info (e.g., "47/50" -> filled: 47, total: 50)
  const [filledSlots, totalSlots] = data.players
    ? data.players.split("/").map((v) => parseInt(v))
    : [0, 1];

  const filledPercentage = (filledSlots / totalSlots) * 100;

  return (
    <div className="relative bg-gradient-to-br from-[#10131f] to-[#10131f] rounded-2xl p-5 mb-5 border border-transparent hover:border-[#06B6D4]/60 transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] group overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-5"></div>

      <div className="relative z-10">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#06B6D4] transition-all duration-300 font-[Orbitron]">
          {data.title}
        </h2>

        {/* Basic Info */}
        <p className="text-sm text-gray-400 mb-3">
          Date: <span className="text-[#06B6D4]">{data.date}</span> &nbsp;|&nbsp;
          Prizepool: <span className="text-[#06B6D4]">{data.prizepool}</span> &nbsp;|&nbsp;
          Entry Fee: <span className="text-[#06B6D4]">{data.entry}</span>
        </p>

        {/* Rewards */}
        <div className="text-gray-300 flex flex-wrap gap-x-5 text-sm mb-4">
          <p>🥇 First: {data.rewards.first}</p>
          <p>🥈 Second: {data.rewards.second}</p>
          <p>🥉 Third: {data.rewards.third}</p>
          <p>⭐ MVP: {data.rewards.mvp}</p>
        </div>

        {/* Slot Bar */}
        <div className="relative mb-4">
          <div className="w-full h-1 bg-[#1b2033] rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-700"
              style={{
                width: `${filledPercentage}%`,
                background: "linear-gradient(#06B6D4)",
              }}
            ></div>
          </div>
          <span className="absolute right-0 -top-4 text-xs text-gray-400">
            {filledSlots}/{totalSlots}
          </span>
        </div>

        {/* Buttons */}
        <div className="relative flex gap-3 mt-3">
          <button className="relative border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300">
            {registerText}
          </button>

          <button
            onClick={() => navigate(`/tournament-details/${data.id}`)}
            className="relative border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300"
          >
            Details
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#06B6D4] to-transparent group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default TournamentCard;

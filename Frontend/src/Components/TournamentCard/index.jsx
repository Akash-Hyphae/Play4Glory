import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterDialog from "../RegisterDialog";

const TournamentCard = ({ data, registerText = "Register", isTDM = false }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const prizePool = Math.floor(
    (data.entryFee || 0) * (data.maxSlots || 0) * 0.8,
  );

  const rewards = isTDM
    ? {
        first: Math.floor(prizePool * 0.4),
        second: Math.floor(prizePool * 0.3),
        third: Math.floor(prizePool * 0.2),
        fourth: Math.floor(prizePool * 0.1),
      }
    : {
        first: Math.floor(prizePool * 0.6),
        second: Math.floor(prizePool * 0.25),
        third: Math.floor(prizePool * 0.1),
        mvp: Math.floor(prizePool * 0.05),
      };

  const filledSlots = data.filledSlots || 0;
  const totalSlots = data.maxSlots || 1;

  const filledPercentage = (filledSlots / totalSlots) * 100;

  return (
    <>
      <div className="relative bg-gradient-to-br from-[#10131f] to-[#10131f] rounded-2xl p-5 mb-5 border border-transparent hover:border-[#06B6D4]/60 transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] group overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-5"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#06B6D4] transition-all duration-300 font-[Orbitron]">
            {data.title}
          </h2>

          <p className="text-sm text-gray-400 mb-3">
            Date:{" "}
            <span className="text-[#06B6D4]">
              {new Date(data.startTime).toLocaleDateString()}
            </span>
            &nbsp;|&nbsp; Prizepool:{" "}
            <span className="text-[#06B6D4]">₹{prizePool}</span>
            &nbsp;|&nbsp; Entry Fee:{" "}
            <span className="text-[#06B6D4]">₹{data.entryFee}</span>
          </p>

          <div className="text-gray-300 flex flex-wrap gap-x-5 text-sm mb-4">
            <p>🥇 First: ₹{rewards.first}</p>
            <p>🥈 Second: ₹{rewards.second}</p>
            <p>🥉 Third: ₹{rewards.third}</p>

            {isTDM ? (
              <p>🏅 Fourth: ₹{rewards.fourth}</p>
            ) : (
              <p>⭐ MVP: ₹{rewards.mvp}</p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="w-full h-1 bg-[#1b2033] rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${filledPercentage}%`,
                  background: "linear-gradient(to right, #06B6D4, #22D3EE)",
                }}
              />
            </div>

            <span className="absolute right-0 -top-4 text-xs text-gray-400">
              {filledSlots}/{totalSlots}
            </span>
          </div>

          <div className="relative flex gap-3 mt-3">
            <button
              onClick={() => setOpenDialog(true)}
              className="relative border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300"
            >
              {registerText}
            </button>

            <button
              onClick={() =>
                navigate(
                  isTDM
                    ? `/tdm-details/${data._id}`
                    : `/tournament-details/${data._id}`,
                )
              }
              className="relative border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300"
            >
              Details
            </button>
          </div>
        </div>
      </div>

      <RegisterDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        tournamentTitle={data.title}
        tournamentId={data._id}
      />
    </>
  );
};

export default TournamentCard;

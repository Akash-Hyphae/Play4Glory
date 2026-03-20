import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMedal } from "react-icons/fa";
import RegisterDialog from "../../Components/RegisterDialog";

const TdmKnockoutPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);

  const tdmTournaments = [
    {
      id: 1,
      title: "BGMI TDM Knockout 1.0",
      date: "1-Jan to 5-Jan",
      prizepool: "₹5000",
      entry: "₹100",
      mode: "squad",
      rewards: {
        first: "₹2000",
        second: "₹1500",
        third: "₹1000",
        fourth: "₹500",
      },
      players: "50/64",
      progress: 78,
    },
    {
      id: 2,
      title: "BGMI TDM Solo Blitz",
      date: "10-Jan to 15-Jan",
      prizepool: "₹4000",
      entry: "₹80",
      mode: "solo",
      rewards: {
        first: "₹1500",
        second: "₹1200",
        third: "₹800",
        fourth: "₹500",
      },
      players: "58/60",
      progress: 96,
    },
    {
      id: 3,
      title: "BGMI TDM Duo Domination",
      date: "20-Jan to 25-Jan",
      prizepool: "₹6000",
      entry: "₹120",
      mode: "duo",
      rewards: {
        first: "₹2500",
        second: "₹2000",
        third: "₹1000",
        fourth: "₹500",
      },
      players: "48/50",
      progress: 95,
    },
    {
      id: 4,
      title: "BGMI TDM Power Clash",
      date: "25-Jan to 30-Jan",
      prizepool: "₹10000",
      entry: "₹200",
      mode: "squad",
      rewards: {
        first: "₹4000",
        second: "₹3000",
        third: "₹2000",
        fourth: "₹1000",
      },
      players: "64/64",
      progress: 100,
    },
  ];

  const filteredTournaments = tdmTournaments.filter(
    (t) =>
      (filter === "all" || t.mode === filter) &&
      t.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="min-h-screen bg-[#0b0e16] text-white px-6 py-10 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide mb-4 md:mb-0">
            TDM Knockout
          </h1>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#121622] border border-cyan-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-3 bg-[#121622] border border-cyan-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            <option value="all">All Types</option>
            <option value="solo">Solo</option>
            <option value="duo">Duo</option>
            <option value="squad">Squad</option>
          </select>
        </div>

        {/* TDM Cards */}
        <div className="space-y-8">
          {filteredTournaments.map((t) => (
            <div
              key={t.id}
              className="bg-[#10131f] border border-cyan-700 rounded-2xl p-6 shadow-[0_0_20px_#00ffff22] hover:shadow-[0_0_25px_#00ffff55] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-cyan-300 mb-1">
                {t.title}
              </h3>
              <div className="text-sm text-gray-300 mb-4">
                <span className="mr-4 text-cyan-200">Date:</span> {t.date}
                <span className="mx-4 text-cyan-200">| Prizepool:</span>{" "}
                {t.prizepool}
                <span className="mx-4 text-cyan-200">| Entry Fee:</span>{" "}
                {t.entry}
              </div>

              {/* Rewards */}
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center gap-1 text-orange-400">
                  <FaMedal /> 1st: {t.rewards.first}
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <FaMedal className="text-gray-400" /> 2nd: {t.rewards.second}
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <FaMedal className="text-amber-600" /> 3rd: {t.rewards.third}
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaMedal className="text-yellow-500" /> 4th:{" "}
                  {t.rewards.fourth}
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative h-1 bg-[#1b2033] rounded-full overflow-hidden mb-2">
                <div
                  className="absolute top-0 left-0 h-full bg-[#06B6D4]"
                  style={{ width: `${t.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-400 text-right">
                {t.players}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setOpenDialog(true)}
                  className="flex-1 py-2 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
                >
                  Register TDM
                </button>
                <button
                  onClick={() => navigate(`/tdm-details/${t.id}`, { state: t })}
                  className="flex-1 py-2 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RegisterDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        tournamentTitle={tdmTournaments.title}
      />
    </>
  );
};

export default TdmKnockoutPage;

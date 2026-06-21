import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaMedal } from "react-icons/fa";
import RegisterDialog from "../../Components/RegisterDialog";

const TdmKnockoutPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [tdmTournaments, setTdmTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await api.get("/tournaments");

        setTdmTournaments(
          res.data.tournaments.filter((t) => t.tournamentCategory === "tdm"),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  const filteredTournaments = tdmTournaments.filter(
    (t) =>
      (filter === "all" || t.tournamentType === filter) &&
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
              key={t._id}
              className="bg-[#10131f] border border-cyan-700 rounded-2xl p-6 shadow-[0_0_20px_#00ffff22] hover:shadow-[0_0_25px_#00ffff55] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-cyan-300 mb-1">
                {t.title}
              </h3>
              <div className="text-sm text-gray-300 mb-4">
                <span className="mr-4 text-cyan-200">Date:</span>{" "}
                {new Date(t.startTime).toLocaleDateString()}
                <span className="mx-4 text-cyan-200">| Prizepool:</span> ₹
                {t.entryFee * t.maxSlots * 0.8}
                <span className="mx-4 text-cyan-200">| Entry Fee:</span> ₹
                {t.entryFee}
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
                  style={{
                    width: `${(t.filledSlots / t.maxSlots) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="text-sm text-gray-400 text-right">
                {t.filledSlots}/{t.maxSlots}
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
                  onClick={() => navigate(`/tdm-details/${t._id}`)}
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
        tournamentTitle="TDM Tournament"
      />
    </>
  );
};

export default TdmKnockoutPage;

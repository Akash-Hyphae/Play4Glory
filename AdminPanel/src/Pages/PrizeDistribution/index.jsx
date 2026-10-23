import React, { useState, useEffect } from "react";
import api from "../../Api/axios";
import { FaTrophy, FaCoins, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const PrizeDistribution = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [calculationData, setCalculationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [distributing, setDistributing] = useState(false);

  // Fetch tournaments
  const fetchTournaments = async () => {
    try {
      const res = await api.get("/tournaments/my-tournaments");
      setTournaments(res.data.tournaments || []);
      if (res.data.tournaments?.length > 0) {
        setSelectedTournament(res.data.tournaments[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  // Fetch calculations when tournament selection changes
  useEffect(() => {
    if (!selectedTournament?._id) return;

    const fetchCalculations = async () => {
      try {
        const res = await api.get(`/calculations/${selectedTournament._id}`);
        setCalculationData(res.data);
      } catch (error) {
        console.log(error);
        setCalculationData(null);
      }
    };

    fetchCalculations();
  }, [selectedTournament]);

  // Handle Automated Prize Distribution
  const handleDistribute = async () => {
    if (!selectedTournament) return;

    const confirmAction = window.confirm(
      `Are you sure you want to distribute ₹${calculationData?.payouts?.prizePool || 0} to the winners' wallets? This cannot be undone.`
    );
    if (!confirmAction) return;

    setDistributing(true);
    try {
      const res = await api.post(`/calculations/distribute/${selectedTournament._id}`);
      alert(res.data.message || "Prizes Distributed Successfully!");

      // Refresh list
      fetchTournaments();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to distribute prizes");
    } finally {
      setDistributing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex justify-center items-center text-cyan-400 text-2xl font-bold">
        Loading Prize Management...
      </div>
    );
  }

  const payouts = calculationData?.payouts;
  const winners = calculationData?.winners;
  const isCompleted = selectedTournament?.status === "completed";

  return (
    <div className="min-h-screen bg-[#0b0e16] text-white px-6 py-10 font-Poppins">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide">
              Prize Distribution
            </h1>
            <p className="text-gray-400 mt-1">
              Automated wallet payouts directly to winning team captains & MVP
            </p>
          </div>

          {/* Tournament Selector */}
          <select
            value={selectedTournament?._id || ""}
            onChange={(e) => {
              const selected = tournaments.find((t) => t._id === e.target.value);
              setSelectedTournament(selected);
            }}
            className="px-4 py-3 bg-[#121622] border border-cyan-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {tournaments.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title} ({t.status.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {selectedTournament && (
          <>
            {/* Status Banner */}
            {isCompleted ? (
              <div className="flex items-center gap-3 bg-green-950/40 border border-green-500 rounded-2xl p-4 text-green-300">
                <FaCheckCircle className="text-2xl" />
                <div>
                  <p className="font-bold">Prize Distributed & Completed</p>
                  <p className="text-sm text-green-400/80">
                    Wallet rewards have already been credited for this tournament.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-cyan-950/40 border border-cyan-700 rounded-2xl p-4 text-cyan-300">
                <FaCoins className="text-2xl text-cyan-400" />
                <div>
                  <p className="font-bold">Ready for Distribution</p>
                  <p className="text-sm text-gray-400">
                    Ensure final points and MVP standings are updated before triggering payouts.
                  </p>
                </div>
              </div>
            )}

            {/* Calculations Breakdown Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#10131f] border border-cyan-900 rounded-2xl p-5 shadow-lg">
                <p className="text-gray-400 text-sm">Total Collection</p>
                <p className="text-2xl font-bold text-white mt-1">
                  ₹{payouts?.totalCollection || 0}
                </p>
              </div>

              <div className="bg-[#10131f] border border-cyan-900 rounded-2xl p-5 shadow-lg">
                <p className="text-gray-400 text-sm">Host Fee (10%)</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">
                  ₹{payouts?.hostAmount || 0}
                </p>
              </div>

              <div className="bg-[#10131f] border border-cyan-900 rounded-2xl p-5 shadow-lg">
                <p className="text-gray-400 text-sm">Platform Fee (10%)</p>
                <p className="text-2xl font-bold text-blue-400 mt-1">
                  ₹{payouts?.platformAmount || 0}
                </p>
              </div>

              <div className="bg-[#10131f] border border-cyan-500 rounded-2xl p-5 shadow-[0_0_20px_#06b6d433]">
                <p className="text-cyan-300 text-sm font-semibold">Net Prize Pool</p>
                <p className="text-3xl font-extrabold text-cyan-400 mt-1">
                  ₹{payouts?.prizePool || 0}
                </p>
              </div>
            </div>

            {/* Winners & Payouts Preview */}
            <div className="bg-[#10131f] border border-cyan-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" /> Winner Allocations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1st Place */}
                <div className="bg-[#141827] border border-yellow-500/50 rounded-xl p-4">
                  <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 font-bold">
                    🥇 1st Place (60%)
                  </span>
                  <p className="text-2xl font-bold text-yellow-400 mt-3">
                    ₹{payouts?.firstPrize || 0}
                  </p>
                  <p className="text-sm font-semibold text-white mt-1 truncate">
                    Team: {winners?.first?.teamName || "TBD"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    Captain: {winners?.first?.registeredBy?.displayName || "N/A"}
                  </p>
                </div>

                {/* 2nd Place */}
                <div className="bg-[#141827] border border-gray-400/50 rounded-xl p-4">
                  <span className="text-xs px-2 py-1 rounded bg-gray-400/20 text-gray-300 font-bold">
                    🥈 2nd Place (25%)
                  </span>
                  <p className="text-2xl font-bold text-gray-300 mt-3">
                    ₹{payouts?.secondPrize || 0}
                  </p>
                  <p className="text-sm font-semibold text-white mt-1 truncate">
                    Team: {winners?.second?.teamName || "TBD"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    Captain: {winners?.second?.registeredBy?.displayName || "N/A"}
                  </p>
                </div>

                {/* 3rd Place */}
                <div className="bg-[#141827] border border-amber-700/50 rounded-xl p-4">
                  <span className="text-xs px-2 py-1 rounded bg-amber-700/20 text-amber-500 font-bold">
                    🥉 3rd Place (10%)
                  </span>
                  <p className="text-2xl font-bold text-amber-500 mt-3">
                    ₹{payouts?.thirdPrize || 0}
                  </p>
                  <p className="text-sm font-semibold text-white mt-1 truncate">
                    Team: {winners?.third?.teamName || "TBD"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    Captain: {winners?.third?.registeredBy?.displayName || "N/A"}
                  </p>
                </div>

                {/* MVP */}
                <div className="bg-[#141827] border border-cyan-500/50 rounded-xl p-4">
                  <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    ⭐ MVP Award (5%)
                  </span>
                  <p className="text-2xl font-bold text-cyan-400 mt-3">
                    ₹{payouts?.mvpPrize || 0}
                  </p>
                  <p className="text-sm font-semibold text-white mt-1 truncate">
                    Player: {winners?.mvp?.playerName || "TBD"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    Kills: {winners?.mvp?.kills || 0}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-cyan-900 flex justify-end">
                <button
                  onClick={handleDistribute}
                  disabled={distributing || isCompleted}
                  className="
                    px-8 py-4 rounded-xl
                    bg-gradient-to-r from-cyan-500 to-blue-500
                    hover:from-cyan-400 hover:to-blue-400
                    text-black font-extrabold text-base
                    shadow-[0_0_20px_#06b6d4aa]
                    transition duration-300
                    disabled:opacity-40 disabled:cursor-not-allowed
                  "
                >
                  {distributing
                    ? "Processing Payouts..."
                    : isCompleted
                    ? "Prizes Already Distributed"
                    : "Distribute Prize Money to Wallets"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PrizeDistribution;
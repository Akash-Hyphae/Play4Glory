import React, { useState, useEffect } from "react";
import api from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import RegisterDialog from "../../Components/RegisterDialog";

const getMapImage = (game) => {
  if (game === "Free Fire") return "/rondo.jpg";
  if (game === "COD Mobile") return "/miramar.png";
  return "/erangle.png";
};

const ScrimsSection = () => {
  const navigate = useNavigate();
  const [scrims, setScrims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Registration Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedScrim, setSelectedScrim] = useState(null);

  useEffect(() => {
    const fetchScrims = async () => {
      try {
        const res = await api.get("/tournaments");
        const allTournaments = res.data.tournaments || [];
        setScrims(
          allTournaments.filter(
            (t) => t.eventType?.toLowerCase() === "scrim"
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchScrims();
  }, []);

  const handleOpenRegister = (scrim) => {
    setSelectedScrim(scrim);
    setOpenDialog(true);
  };

  const filteredScrims = scrims.filter(
    (s) =>
      (filter === "all" || s.tournamentType?.toLowerCase() === filter) &&
      s.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E16] flex justify-center items-center text-cyan-400 text-2xl font-bold">
        Loading Live Scrims...
      </div>
    );
  }

  return (
    <section className="py-8 px-6 space-y-8 bg-[#0B0E16] min-h-screen font-Poppins">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide">
            Live Scrims
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Practice matches & competitive daily lobby slots
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search scrims by title..."
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

      {/* Scrims Grid */}
      {filteredScrims.length === 0 ? (
        <div className="bg-[#10131F] border border-cyan-900 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">No Scrims Available</h2>
          <p className="text-gray-400 text-sm">
            There are no active practice scrims scheduled right now. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScrims.map((scrim) => {
            const filled = scrim.filledSlots || 0;
            const max = scrim.maxSlots || 16;
            const progress = (filled / max) * 100;
            const isFull = filled >= max;

            return (
              <div
                key={scrim._id}
                className="bg-[#10131F] rounded-2xl overflow-hidden border border-cyan-700/50 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group flex flex-col justify-between"
              >
                {/* Banner / Map */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={scrim.bannerImage || getMapImage(scrim.game)}
                    alt={scrim.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10131F] via-[#10131F]/30 to-transparent" />
                  <span className="absolute top-3 left-3 bg-cyan-500 text-black text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                    {scrim.game}
                  </span>
                  <span className="absolute top-3 right-3 bg-black/70 border border-cyan-500/40 text-cyan-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    {scrim.tournamentType}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition">
                      {scrim.title}
                    </h3>

                    <div className="text-xs text-gray-400 mt-2 space-y-1">
                      <p>
                        <span className="text-cyan-300">Time:</span>{" "}
                        {scrim.startTime
                          ? new Date(scrim.startTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "TBD"}
                      </p>
                      <p>
                        <span className="text-cyan-300">Date:</span>{" "}
                        {scrim.startTime
                          ? new Date(scrim.startTime).toLocaleDateString()
                          : "TBD"}
                      </p>
                      <p>
                        <span className="text-cyan-300">Entry Fee:</span>{" "}
                        {scrim.entryFee === 0 ? "FREE" : `₹${scrim.entryFee}`}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Slots Filled</span>
                      <span className="font-semibold text-cyan-300">
                        {filled}/{max}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1B2033] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleOpenRegister(scrim)}
                      disabled={isFull || scrim.status === "completed"}
                      className="flex-1 py-2.5 rounded-xl border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold text-sm transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isFull
                        ? "Slot Full"
                        : scrim.status === "completed"
                        ? "Ended"
                        : "Register Scrim"}
                    </button>

                    <button
                      onClick={() => navigate(`/tournament-details/${scrim._id}`)}
                      className="px-4 py-2.5 rounded-xl border border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-white text-sm font-semibold transition duration-200"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Real Dynamic Registration Dialog */}
      {selectedScrim && (
        <RegisterDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setSelectedScrim(null);
          }}
          tournamentTitle={selectedScrim.title}
          tournamentId={selectedScrim._id}
        />
      )}
    </section>
  );
};

export default ScrimsSection;
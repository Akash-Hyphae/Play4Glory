import React, { useState, useEffect } from "react";
import api from "../../Api/axios";
import TournamentCard from "../../Components/TournamentCard";
import RegisterDialog from "../../Components/RegisterDialog";

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMode, setSelectedMode] = useState("All");

  // Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await api.get("/tournaments");
        const all = res.data.tournaments || [];
        // Only standard tournaments
        setTournaments(
          all.filter((t) => t.eventType?.toLowerCase() === "tournament")
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleOpenRegister = (tournament) => {
    setSelectedTournament(tournament);
    setOpenDialog(true);
  };

  const filteredTournaments = tournaments.filter((item) => {
    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMode =
      selectedMode === "All" ||
      item.tournamentType?.toLowerCase() === selectedMode.toLowerCase();

    return matchesSearch && matchesMode;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E16] flex justify-center items-center text-cyan-400 text-2xl font-bold font-Poppins">
        Loading Tournaments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E16] text-white px-6 md:px-12 py-10 font-Poppins">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide font-[Orbitron]">
          Tournaments
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Compete in high-stakes esports tournaments and earn cash prizes
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search tournaments by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 bg-[#121622] border border-cyan-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
        />

        <select
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value)}
          className="w-full md:w-52 px-4 py-3 bg-[#121622] border border-cyan-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
        >
          <option value="All">All Modes</option>
          <option value="solo">Solo</option>
          <option value="duo">Duo</option>
          <option value="squad">Squad</option>
        </select>
      </div>

      {/* Tournaments List */}
      {filteredTournaments.length === 0 ? (
        <div className="bg-[#10131F] border border-cyan-900 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">
            No Tournaments Found
          </h2>
          <p className="text-gray-400 text-sm">
            There are currently no tournaments matching your filters.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTournaments.map((tournament) => (
            <TournamentCard
              key={tournament._id}
              data={tournament}
              registerText="Register Tournament"
              isTDM={false}
            />
          ))}
        </div>
      )}

      {/* Register Dialog with Guaranteed Valid ID */}
      {selectedTournament && (
        <RegisterDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setSelectedTournament(null);
          }}
          tournamentTitle={selectedTournament.title}
          tournamentId={selectedTournament._id}
        />
      )}
    </div>
  );
};

export default TournamentPage;
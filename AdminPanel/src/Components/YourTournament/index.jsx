import React, { useState, useEffect } from "react";

import api from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { FaMedal, FaStar } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const YourTournament = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // POPUP STATES
  const [showPopup, setShowPopup] = useState(false);
  // const [selectedTournament, setSelectedTournament] = useState(null);

  const [youtubeLink, setYoutubeLink] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await api.get("/tournaments/my-tournaments");

        setTournaments(res.data.tournaments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTournaments();
  }, []);

  // OPEN POPUP
  const handleOpenPopup = (tournament) => {
    setSelectedTournament(tournament);
    setShowPopup(true);
  };

  // CLOSE POPUP
  const handleClosePopup = () => {
    setShowPopup(false);
    setYoutubeLink("");
    setThumbnail(null);
  };

  // SUBMIT
  const handleSubmit = () => {
    console.log("Tournament:", selectedTournament);
    console.log("Youtube Link:", youtubeLink);
    console.log("Thumbnail:", thumbnail);

    alert("Youtube Link Added Successfully!");

    handleClosePopup();
  };

  const filteredTournaments = tournaments.filter(
    (t) =>
      (filter === "all" || t.tournamentType?.toLowerCase() === filter) &&
      t.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="min-h-screen bg-[#0b0e16] text-white px-6 py-10 font-Poppins">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide mb-4 md:mb-0">
            Your Tournament
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

        {/* Tournament Cards */}
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
                <span className="mr-4 text-cyan-200">Date:</span> {t.date}
                <span className="mx-4 text-cyan-200">| Prizepool:</span>{" "}
                {t.prizepool}
                <span className="mx-4 text-cyan-200">| Entry Fee:</span>{" "}
                {t.entry}
              </div>

              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <span className="text-cyan-300">Game: {t.game}</span>

                <span className="text-green-400">Type: {t.tournamentType}</span>

                <span className="text-yellow-400">Status: {t.status}</span>
              </div>

              <div className="relative h-1 bg-[#1b2033] rounded-full overflow-hidden mb-2">
                <div
                  className="absolute top-0 left-0 h-full bg-[#06B6D4]"
                  style={{
                    width: `${(t.filledSlots / t.maxSlots) * 100}%`,
                  }}
                />
              </div>

              <div className="text-sm text-gray-400 text-right">
                {t.filledSlots}/{t.maxSlots}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleOpenPopup(t)}
                  className="flex-1 py-2 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
                >
                  Add Youtube Link
                </button>
                <button
                  onClick={() => navigate("/leaderboard", { state: t })}
                  className="flex-1 py-2 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
                >
                  Leaderboard
                </button>
                <button
                  onClick={() => navigate(`/points-table/${t._id}`)}
                  className="flex-1 py-2 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
                >
                  Points Table
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Sticky Create Tournament Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => navigate("/create")}
            className="
            px-6 py-3 
            bg-gradient-to-r from-cyan-500 to-blue-500 
          text-black font-semibold rounded-xl 
            shadow-[0_0_15px_#06b6d4aa] 
            transition-all duration-300 
            hover:scale-105 
            hover:shadow-[0_0_30px_#06b6d4ff]
          hover:from-cyan-400 hover:to-blue-400
          "
          >
            + Create Tournament
          </button>

          {/* POPUP MODAL */}
          {showPopup && (
            <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">
              <div className="w-full max-w-lg bg-[#10131f] border border-cyan-600 rounded-2xl p-6 relative shadow-[0_0_25px_#00ffff44]">
                {/* Close Button */}
                <button
                  onClick={handleClosePopup}
                  className="absolute top-4 right-4 text-white hover:text-red-400 text-xl"
                >
                  <FaTimes />
                </button>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">
                  Add Youtube Link
                </h2>

                {/* Tournament Name */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-1">Tournament</p>

                  <div className="bg-[#1a2033] px-4 py-3 rounded-lg border border-cyan-700 text-cyan-300">
                    {selectedTournament?.title}
                  </div>
                </div>

                {/* Youtube Link */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-300 mb-2">
                    Youtube Link
                  </label>

                  <input
                    type="text"
                    placeholder="Paste youtube video link..."
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#1a2033] border border-cyan-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                {/* Thumbnail Upload */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-300 mb-2">
                    Upload Thumbnail
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    className="w-full text-sm text-gray-300"
                  />

                  {thumbnail && (
                    <p className="mt-2 text-cyan-300 text-sm">
                      Selected: {thumbnail.name}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default YourTournament;

import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import api from "../../Api/axios";

const IdPass = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  // POPUP STATE
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  // FORM STATES
  const [group, setGroup] = useState("Group A");
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [mapName, setMapName] = useState("Erangel");
  const [submitting, setSubmitting] = useState(false);

  // FETCH TOURNAMENTS
  const fetchTournaments = async () => {
    try {
      const res = await api.get("/tournaments/my-tournaments");
      setTournaments(res.data.tournaments || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    setRoomId("");
    setPassword("");
    setGroup("Group A");
    setMapName("Erangel");
  };

  // SEND ID PASS TO BACKEND
  const handleSend = async () => {
    if (!roomId || !password) {
      return alert("Please enter both Room ID and Password");
    }

    try {
      setSubmitting(true);
      await api.post("/rooms", {
        tournament: selectedTournament._id,
        roomId: roomId.trim(),
        roomPassword: password.trim(),
        group,
        mapName,
        published: true,
      });

      alert(`Room ID & Password published for ${selectedTournament.title}!`);
      handleClosePopup();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to publish Room details");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 md:px-8 py-6">
      {/* PAGE CONTAINER */}
      <div className="border border-cyan-700 rounded-[30px] bg-[#070d22] p-5 shadow-[0_0_25px_#00ffff15]">
        {/* HEADING */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-cyan-400">
            Tournament ID Pass
          </h1>

          <p className="text-gray-400 mt-1 text-sm">
            Send Room ID & Password to registered players
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-8 text-cyan-400">Loading tournaments...</p>
          ) : tournaments.length === 0 ? (
            <p className="text-center py-8 text-gray-400">No tournaments found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1a2438] text-cyan-400 text-[15px]">
                  <th className="py-4 px-4 text-left">#</th>
                  <th className="py-4 px-4 text-left">Tournament Title</th>
                  <th className="py-4 px-4 text-center">Mode</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {tournaments.map((tournament, index) => (
                  <tr key={tournament._id} className="border-b border-[#26314d]">
                    <td className="py-4 px-4 text-[16px] font-bold">
                      {index + 1}
                    </td>

                    <td className="py-4 px-4 text-[16px] font-semibold">
                      {tournament.title}
                    </td>

                    <td className="py-4 px-4 text-center text-[15px]">
                      {tournament.tournamentType}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleOpenPopup(tournament)}
                        className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition text-sm font-medium"
                      >
                        Publish ID Pass
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md bg-[#0b1020] border border-cyan-700 rounded-2xl p-5 relative shadow-[0_0_25px_#00ffff30]">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold text-cyan-400 mb-1">
              Send ID & Password
            </h2>

            <p className="text-sm text-gray-400 mb-5">
              {selectedTournament?.title}
            </p>

            {/* GROUP */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-300">
                Select Group
              </label>

              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#121826] border border-cyan-700 outline-none text-sm text-white"
              >
                <option>Group A</option>
                <option>Group B</option>
                <option>Group C</option>
                <option>Group D</option>
                <option>Semifinal-1</option>
                <option>Semifinal-2</option>
                <option>Final</option>
                <option>All</option>
              </select>
            </div>

            {/* MAP NAME */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-300">
                Map Name
              </label>
              <select
                value={mapName}
                onChange={(e) => setMapName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#121826] border border-cyan-700 outline-none text-sm text-white"
              >
                <option>Erangel</option>
                <option>Miramar</option>
                <option>Sanhok</option>
                <option>Rondo</option>
                <option>Vikendi</option>
                <option>TDM Warehouse</option>
              </select>
            </div>

            {/* ROOM ID */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-300">
                Room ID
              </label>

              <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#121826] border border-cyan-700 outline-none text-sm text-white"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-5">
              <label className="block text-sm mb-2 text-gray-300">
                Password
              </label>

              <input
                type="text"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#121826] border border-cyan-700 outline-none text-sm text-white"
              />
            </div>

            {/* SEND BUTTON */}
            <button
              onClick={handleSend}
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FaPaperPlane />
              {submitting ? "Publishing..." : "Send & Publish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdPass;
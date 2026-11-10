import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api/axios";
import {
  FaCalendarAlt,
  FaVideo,
  FaTrophy,
  FaUsers,
  FaMedal,
  FaPlus,
  FaSave,
  FaEdit,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

const AdminTournamentDetail = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("schedule");
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  // SCHEDULE STATE
  const [schedules, setSchedules] = useState([]);
  const [matchTitle, setMatchTitle] = useState("");
  const [matchRound, setMatchRound] = useState("Round 1");
  const [matchGroup, setMatchGroup] = useState("Group A");
  const [mapName, setMapName] = useState("Erangel");
  const [matchTime, setMatchTime] = useState("");
  const [scheduleLoading, setScheduleLoading] = useState(false);

  // STREAM STATE
  const [liveStreamUrl, setLiveStreamUrl] = useState("");
  const [liveStreamThumbnail, setLiveStreamThumbnail] = useState("");
  const [streamSaving, setStreamSaving] = useState(false);

  // MVP LEADERBOARD STATE
  const [mvpPlayers, setMvpPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newKills, setNewKills] = useState("");
  const [newDamage, setNewDamage] = useState("");
  const [newSurvival, setNewSurvival] = useState("");

  // TEAMS STATE
  const [registeredTeams, setRegisteredTeams] = useState([]);

  const fetchTournamentData = async () => {
    try {
      const [tournRes, schedRes, mvpRes, teamsRes] = await Promise.all([
        api.get(`/tournaments/${tournamentId}`),
        api.get(`/schedules/${tournamentId}`),
        api.get(`/mvp/${tournamentId}`),
        api.get(`/registrations/${tournamentId}`),
      ]);

      const tData = tournRes.data.tournament;
      setTournament(tData);
      setLiveStreamUrl(tData.liveStreamUrl || "");
      setLiveStreamThumbnail(tData.liveStreamThumbnail || "");
      setSchedules(schedRes.data.schedules || []);

      const sortedMvp = (mvpRes.data.players || [])
        .sort((a, b) => b.kills - a.kills || b.damage - a.damage)
        .map((p, idx) => ({ ...p, rank: idx + 1, editing: false }));
      setMvpPlayers(sortedMvp);

      setRegisteredTeams(teamsRes.data.registrations || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tournamentId) {
      fetchTournamentData();
    }
  }, [tournamentId]);

  // ADD SCHEDULE
  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!matchTitle.trim() || !matchTime) {
      return alert("Please enter Match Title and Start Time");
    }

    try {
      setScheduleLoading(true);
      await api.post("/schedules", {
        tournament: tournamentId,
        title: matchTitle.trim(),
        round: matchRound,
        group: matchGroup,
        mapName,
        startTime: matchTime,
      });

      setMatchTitle("");
      setMatchTime("");
      alert("Match scheduled successfully!");
      const res = await api.get(`/schedules/${tournamentId}`);
      setSchedules(res.data.schedules || []);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to schedule match");
    } finally {
      setScheduleLoading(false);
    }
  };

  // SAVE STREAM
  const handleSaveStream = async () => {
    if (!liveStreamUrl.trim()) {
      return alert("Please enter a valid YouTube Stream Link");
    }

    try {
      setStreamSaving(true);
      await api.put(`/tournaments/stream/${tournamentId}`, {
        liveStreamUrl: liveStreamUrl.trim(),
        liveStreamThumbnail: liveStreamThumbnail.trim(),
      });
      alert("Live Stream details updated!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update stream");
    } finally {
      setStreamSaving(false);
    }
  };

  // ADD MVP PLAYER
  const handleAddMvp = async () => {
    if (!newPlayerName.trim() || !newTeamName.trim()) {
      return alert("Please enter Player Name and Team Name");
    }

    try {
      await api.post("/mvp", {
        tournament: tournamentId,
        playerName: newPlayerName.trim(),
        teamName: newTeamName.trim(),
        kills: Number(newKills) || 0,
        damage: Number(newDamage) || 0,
        survivalTime: Number(newSurvival) || 0,
      });

      setNewPlayerName("");
      setNewTeamName("");
      setNewKills("");
      setNewDamage("");
      setNewSurvival("");

      const res = await api.get(`/mvp/${tournamentId}`);
      const sorted = (res.data.players || [])
        .sort((a, b) => b.kills - a.kills || b.damage - a.damage)
        .map((p, idx) => ({ ...p, rank: idx + 1, editing: false }));
      setMvpPlayers(sorted);
    } catch (error) {
      console.error(error);
      alert("Unable to add player to MVP leaderboard");
    }
  };

  const handleEditMvp = (id) => {
    setMvpPlayers((prev) =>
      prev.map((p) => (p._id === id ? { ...p, editing: !p.editing } : p))
    );
  };

  const handleMvpChange = (id, field, value) => {
    setMvpPlayers((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, [field]: field === "playerName" || field === "teamName" ? value : Number(value) }
          : p
      )
    );
  };

  const handleSaveMvp = async (player) => {
    try {
      await api.put(`/mvp/${player._id}`, {
        playerName: player.playerName,
        teamName: player.teamName,
        kills: player.kills,
        damage: player.damage,
        survivalTime: player.survivalTime,
      });

      const res = await api.get(`/mvp/${tournamentId}`);
      const sorted = (res.data.players || [])
        .sort((a, b) => b.kills - a.kills || b.damage - a.damage)
        .map((p, idx) => ({ ...p, rank: idx + 1, editing: false }));
      setMvpPlayers(sorted);
    } catch (error) {
      console.error(error);
      alert("Failed to update player stats");
    }
  };

  const handleDeleteMvp = async (id) => {
    if (!window.confirm("Remove this player from MVP Leaderboard?")) return;
    try {
      await api.delete(`/mvp/${id}`);
      setMvpPlayers((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete MVP entry");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e16] flex justify-center items-center text-cyan-400 font-bold text-2xl font-[Orbitron]">
        Loading Tournament Management...
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-[#0b0e16] flex justify-center items-center text-white text-xl">
        Tournament not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e16] text-white px-6 py-8 font-Poppins">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Link & Header */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition cursor-pointer text-sm font-semibold"
        >
          <FaArrowLeft /> Back to Tournaments
        </button>

        <div className="bg-[#10131f] border border-cyan-700/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.15)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-cyan-400 font-[Orbitron]">
              {tournament.title}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {tournament.game} • {tournament.tournamentType} • {tournament.eventType?.toUpperCase()} • {tournament.filledSlots}/{tournament.maxSlots} Slots
            </p>
          </div>

          <div className="flex gap-3">
            {tournament.eventType === "tdm" ? (
              <button
                onClick={() => navigate(`/tdm-bracket/${tournament._id}`)}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition"
              >
                TDM Fixture Bracket
              </button>
            ) : (
              <button
                onClick={() => navigate(`/points-table/${tournament._id}`)}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition"
              >
                Points Table Matrix
              </button>
            )}
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 border-b border-cyan-900 pb-3">
          {[
            { id: "schedule", label: "Schedule Matches", icon: <FaCalendarAlt /> },
            { id: "stream", label: "YouTube Stream", icon: <FaVideo /> },
            { id: "mvp", label: "MVP Leaderboard", icon: <FaMedal /> },
            { id: "teams", label: `Registered Teams (${registeredTeams.length})`, icon: <FaUsers /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4aa]"
                  : "bg-[#141827] text-gray-300 hover:text-cyan-400 border border-cyan-800"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: SCHEDULE */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <div className="bg-[#10131f] border border-cyan-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2 font-[Orbitron]">
                <FaCalendarAlt /> Add New Match Schedule
              </h2>

              <form onSubmit={handleAddSchedule} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Match Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Match 1 (Group A vs Group B)"
                    value={matchTitle}
                    onChange={(e) => setMatchTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none focus:border-cyan-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Round</label>
                  <input
                    type="text"
                    placeholder="e.g. Qualifiers, Round 1, Finals"
                    value={matchRound}
                    onChange={(e) => setMatchRound(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none focus:border-cyan-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Group Name</label>
                  <select
                    value={matchGroup}
                    onChange={(e) => setMatchGroup(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none focus:border-cyan-400 text-sm"
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

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Map Name</label>
                  <select
                    value={mapName}
                    onChange={(e) => setMapName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none focus:border-cyan-400 text-sm"
                  >
                    <option>Erangel</option>
                    <option>Miramar</option>
                    <option>Sanhok</option>
                    <option>Rondo</option>
                    <option>Vikendi</option>
                    <option>TDM Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={matchTime}
                    onChange={(e) => setMatchTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none focus:border-cyan-400 text-sm"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={scheduleLoading}
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition disabled:opacity-50 cursor-pointer text-sm font-[Orbitron]"
                  >
                    {scheduleLoading ? "Saving..." : "+ Save Match Schedule"}
                  </button>
                </div>
              </form>
            </div>

            {/* SCHEDULE LIST */}
            <div className="bg-[#10131f] border border-cyan-700/60 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-4 font-[Orbitron]">
                Current Scheduled Matches ({schedules.length})
              </h3>

              {schedules.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">
                  No matches scheduled yet for this tournament.
                </p>
              ) : (
                <div className="space-y-3">
                  {schedules.map((s, idx) => (
                    <div
                      key={s._id || idx}
                      className="bg-[#141827] border border-cyan-900 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full border border-cyan-400 text-cyan-300 flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-white">
                            {s.title} • <span className="text-cyan-400">{s.mapName}</span>
                          </p>
                          <p className="text-xs text-gray-400">
                            {s.group ? `Group: ${s.group}` : s.round} • {new Date(s.startTime).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                        {s.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: YOUTUBE STREAM */}
        {activeTab === "stream" && (
          <div className="bg-[#10131f] border border-cyan-700/60 rounded-2xl p-6 max-w-2xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2 font-[Orbitron]">
              <FaVideo /> Live Stream Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">YouTube Live Stream / Video Link</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={liveStreamUrl}
                  onChange={(e) => setLiveStreamUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Custom Thumbnail Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://example.com/thumbnail.jpg"
                  value={liveStreamThumbnail}
                  onChange={(e) => setLiveStreamThumbnail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <button
                onClick={handleSaveStream}
                disabled={streamSaving}
                className="py-3 px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition cursor-pointer font-[Orbitron] text-sm"
              >
                {streamSaving ? "Updating Stream..." : "Save Stream URL"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MVP LEADERBOARD */}
        {activeTab === "mvp" && (
          <div className="space-y-6">
            <div className="bg-[#10131f] border border-cyan-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 font-[Orbitron]">
                + Add MVP Player Stats
              </h2>

              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Player Name"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none flex-1 min-w-[150px] text-sm"
                />
                <input
                  type="text"
                  placeholder="Team Name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none flex-1 min-w-[150px] text-sm"
                />
                <input
                  type="number"
                  placeholder="Kills"
                  value={newKills}
                  onChange={(e) => setNewKills(e.target.value)}
                  className="w-24 px-3 py-2 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none text-sm"
                />
                <input
                  type="number"
                  placeholder="Damage"
                  value={newDamage}
                  onChange={(e) => setNewDamage(e.target.value)}
                  className="w-28 px-3 py-2 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none text-sm"
                />
                <input
                  type="number"
                  placeholder="Survival (Sec)"
                  value={newSurvival}
                  onChange={(e) => setNewSurvival(e.target.value)}
                  className="w-32 px-3 py-2 rounded-lg bg-[#141827] border border-cyan-800 text-white outline-none text-sm"
                />
                <button
                  onClick={handleAddMvp}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer text-sm font-[Orbitron]"
                >
                  <FaPlus /> Add Player
                </button>
              </div>
            </div>

            <div className="bg-[#10131f] border border-cyan-700/60 rounded-2xl p-6 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#141827] text-cyan-400 text-sm">
                  <tr>
                    <th className="p-3">Rank</th>
                    <th className="p-3">Player</th>
                    <th className="p-3">Team</th>
                    <th className="p-3 text-center">Kills</th>
                    <th className="p-3 text-center">Damage</th>
                    <th className="p-3 text-center">Survival</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-800">
                  {mvpPlayers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-6 text-gray-400">
                        No MVP players recorded yet.
                      </td>
                    </tr>
                  ) : (
                    mvpPlayers.map((p) => (
                      <tr key={p._id} className="hover:bg-cyan-500/5">
                        <td className="p-3 font-bold text-cyan-400">#{p.rank}</td>
                        <td className="p-3">
                          {p.editing ? (
                            <input
                              value={p.playerName}
                              onChange={(e) => handleMvpChange(p._id, "playerName", e.target.value)}
                              className="px-2 py-1 rounded bg-[#1a2033] border border-cyan-700 text-white"
                            />
                          ) : (
                            p.playerName
                          )}
                        </td>
                        <td className="p-3">
                          {p.editing ? (
                            <input
                              value={p.teamName}
                              onChange={(e) => handleMvpChange(p._id, "teamName", e.target.value)}
                              className="px-2 py-1 rounded bg-[#1a2033] border border-cyan-700 text-white"
                            />
                          ) : (
                            p.teamName
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {p.editing ? (
                            <input
                              type="number"
                              value={p.kills}
                              onChange={(e) => handleMvpChange(p._id, "kills", e.target.value)}
                              className="w-16 px-2 py-1 rounded bg-[#1a2033] border border-cyan-700 text-center text-white"
                            />
                          ) : (
                            <span className="font-bold text-cyan-300">{p.kills}</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {p.editing ? (
                            <input
                              type="number"
                              value={p.damage}
                              onChange={(e) => handleMvpChange(p._id, "damage", e.target.value)}
                              className="w-20 px-2 py-1 rounded bg-[#1a2033] border border-cyan-700 text-center text-white"
                            />
                          ) : (
                            p.damage
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {p.editing ? (
                            <input
                              type="number"
                              value={p.survivalTime}
                              onChange={(e) => handleMvpChange(p._id, "survivalTime", e.target.value)}
                              className="w-20 px-2 py-1 rounded bg-[#1a2033] border border-cyan-700 text-center text-white"
                            />
                          ) : (
                            p.survivalTime
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center gap-2">
                            {p.editing ? (
                              <button
                                onClick={() => handleSaveMvp(p)}
                                className="px-3 py-1 bg-green-500 text-black font-semibold rounded flex items-center gap-1 cursor-pointer"
                              >
                                <FaSave /> Save
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEditMvp(p._id)}
                                className="px-3 py-1 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded flex items-center gap-1 cursor-pointer"
                              >
                                <FaEdit /> Edit
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMvp(p._id)}
                              className="px-3 py-1 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white rounded flex items-center gap-1 cursor-pointer"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REGISTERED TEAMS & ALL 5 PLAYERS */}
        {activeTab === "teams" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-cyan-400 font-[Orbitron]">
                Registered Teams & Player Rosters ({registeredTeams.length})
              </h2>
            </div>

            {registeredTeams.length === 0 ? (
              <div className="bg-[#10131f] border border-cyan-900 rounded-2xl p-10 text-center text-gray-400">
                No teams have registered for this tournament yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registeredTeams.map((team, idx) => (
                  <div
                    key={team._id || idx}
                    className="bg-[#10131f] border border-cyan-800/80 rounded-2xl p-6 shadow-lg hover:border-cyan-400 transition"
                  >
                    <div className="flex justify-between items-start border-b border-cyan-900/60 pb-3 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-300 font-[Orbitron]">
                          {team.teamName}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Captain: <strong className="text-white">{team.registeredBy?.displayName || "N/A"}</strong>
                        </p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                        Slot #{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
                      Player Roster (5 Players):
                    </h4>

                    {team.players && team.players.length > 0 ? (
                      <div className="space-y-2">
                        {team.players.map((p, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-[#141827] px-3.5 py-2 rounded-xl flex justify-between items-center text-xs border border-gray-800"
                          >
                            <div>
                              <span className="text-cyan-400 font-semibold mr-2">
                                P{pIdx + 1}{pIdx === 4 ? " (Sub)" : ""}:
                              </span>
                              <strong className="text-white">{p.name || "Player " + (pIdx + 1)}</strong>
                            </div>
                            <div className="text-right text-gray-400">
                              <span>IGN: <strong className="text-cyan-300">{p.ign || "—"}</strong></span>
                              <span className="ml-3">ID: <strong className="text-white">{p.gameId || "—"}</strong></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#141827] p-4 rounded-xl text-xs text-gray-400">
                        Default Captain registered: <strong>{team.registeredBy?.inGameName || "Direct registration"}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTournamentDetail;
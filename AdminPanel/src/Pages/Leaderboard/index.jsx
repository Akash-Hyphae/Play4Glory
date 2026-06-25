import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../Api/axios";

import { FaEdit, FaSave, FaTrash, FaPlus } from "react-icons/fa";

const Leaderboard = () => {
  const location = useLocation();
  const tournament = location.state;

  const [players, setPlayers] = useState([]);

  const [newPlayer, setNewPlayer] = useState("");
  const [newTeam, setNewTeam] = useState("");
  const [newKills, setNewKills] = useState("");
  const [newDamage, setNewDamage] = useState("");
  const [newSurvival, setNewSurvival] = useState("");

  // =============================
  // FETCH PLAYERS
  // =============================
 // =============================
// FETCH PLAYERS
// =============================
const fetchPlayers = async () => {
  try {
    const res = await api.get(`/mvp/${tournament._id}`);

    console.log("API Response:", res.data);

    const sorted = (res.data.players || [])
      .sort((a, b) => {
        if (b.kills !== a.kills) {
          return b.kills - a.kills;
        }

        if (b.damage !== a.damage) {
          return b.damage - a.damage;
        }

        return b.survivalTime - a.survivalTime;
      })
      .map((player, index) => ({
        ...player,
        rank: index + 1,
        editing: false,
      }));

    setPlayers(sorted);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    if (tournament?._id) {
      fetchPlayers();
    }
  }, [tournament]);

  // =============================
  // ADD PLAYER
  // =============================
  const handleAddPlayer = async () => {
    if (!newPlayer || !newTeam) {
      return alert("Fill all required fields");
    }

    try {
      await api.post("/mvp", {
        tournament: tournament._id,
        playerName: newPlayer,
        teamName: newTeam,
        kills: Number(newKills),
        damage: Number(newDamage),
        survivalTime: Number(newSurvival),
      });

      setNewPlayer("");
      setNewTeam("");
      setNewKills("");
      setNewDamage("");
      setNewSurvival("");

      fetchPlayers();
    } catch (error) {
      console.log(error);
      alert("Unable to add player");
    }
  };

  // =============================
  // ENABLE EDIT
  // =============================
  const handleEdit = (id) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player._id === id
          ? {
              ...player,
              editing: !player.editing,
            }
          : player,
      ),
    );
  };

  // =============================
  // INPUT CHANGE
  // =============================
  const handleChange = (id, field, value) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player._id === id
          ? {
              ...player,
              [field]:
                field === "playerName" || field === "teamName"
                  ? value
                  : Number(value),
            }
          : player,
      ),
    );
  };

  // =============================
  // SAVE
  // =============================
  const handleSave = async (player) => {
    try {
      await api.put(`/mvp/${player._id}`, {
        playerName: player.playerName,
        teamName: player.teamName,
        kills: player.kills,
        damage: player.damage,
        survivalTime: player.survivalTime,
      });

      fetchPlayers();
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  // =============================
  // DELETE
  // =============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this player?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/mvp/${id}`);

      fetchPlayers();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e16] text-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-cyan-400">Leaderboard</h1>

          <p className="text-gray-400 mt-2">{tournament?.title}</p>
        </div>

        {/* Add Player */}
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Player Name"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#1a2033] border border-cyan-700 outline-none"
          />

          <input
            type="text"
            placeholder="Team Name"
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#1a2033] border border-cyan-700 outline-none"
          />

          <input
            type="number"
            placeholder="Kills"
            value={newKills}
            onChange={(e) => setNewKills(e.target.value)}
            className="w-24 px-3 py-2 rounded-lg bg-[#1a2033] border border-cyan-700 outline-none"
          />

          <input
            type="number"
            placeholder="Damage"
            value={newDamage}
            onChange={(e) => setNewDamage(e.target.value)}
            className="w-28 px-3 py-2 rounded-lg bg-[#1a2033] border border-cyan-700 outline-none"
          />

          <input
            type="number"
            placeholder="Survival"
            value={newSurvival}
            onChange={(e) => setNewSurvival(e.target.value)}
            className="w-28 px-3 py-2 rounded-lg bg-[#1a2033] border border-cyan-700 outline-none"
          />

          <button
            onClick={handleAddPlayer}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold flex items-center gap-2"
          >
            <FaPlus />
            Add
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl border border-cyan-700">
        <table className="w-full">
          <thead className="bg-[#10131f] text-cyan-300">
            <tr>
              <th className="px-5 py-4 text-left">Rank</th>

              <th className="px-5 py-4 text-left">Player</th>

              <th className="px-5 py-4 text-left">Team</th>

              <th className="px-5 py-4 text-center">Kills</th>

              <th className="px-5 py-4 text-center">Damage</th>

              <th className="px-5 py-4 text-center">Survival</th>

              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {players.map((player) => (
              <tr
                key={player._id}
                className="border-t border-cyan-900 hover:bg-[#111827]"
              >
                <td className="px-5 py-4 font-bold text-cyan-400">
                  #{player.rank}
                </td>

                {/* Player */}

                <td className="px-5 py-4">
                  {player.editing ? (
                    <input
                      value={player.playerName}
                      onChange={(e) =>
                        handleChange(player._id, "playerName", e.target.value)
                      }
                      className="px-2 py-1 rounded bg-[#1a2033] border border-cyan-700"
                    />
                  ) : (
                    player.playerName
                  )}
                </td>

                {/* Team */}

                <td className="px-5 py-4">
                  {player.editing ? (
                    <input
                      value={player.teamName}
                      onChange={(e) =>
                        handleChange(player._id, "teamName", e.target.value)
                      }
                      className="px-2 py-1 rounded bg-[#1a2033] border border-cyan-700"
                    />
                  ) : (
                    player.teamName
                  )}
                </td>

                {/* Kills */}

                <td className="px-5 py-4 text-center">
                  {player.editing ? (
                    <input
                      type="number"
                      value={player.kills}
                      onChange={(e) =>
                        handleChange(player._id, "kills", e.target.value)
                      }
                      className="w-20 px-2 py-1 rounded bg-[#1a2033] border border-cyan-700 text-center"
                    />
                  ) : (
                    player.kills
                  )}
                </td>

                {/* Damage */}

                <td className="px-5 py-4 text-center">
                  {player.editing ? (
                    <input
                      type="number"
                      value={player.damage}
                      onChange={(e) =>
                        handleChange(player._id, "damage", e.target.value)
                      }
                      className="w-24 px-2 py-1 rounded bg-[#1a2033] border border-cyan-700 text-center"
                    />
                  ) : (
                    player.damage
                  )}
                </td>

                {/* Survival */}

                <td className="px-5 py-4 text-center">
                  {player.editing ? (
                    <input
                      type="number"
                      value={player.survivalTime}
                      onChange={(e) =>
                        handleChange(player._id, "survivalTime", e.target.value)
                      }
                      className="w-24 px-2 py-1 rounded bg-[#1a2033] border border-cyan-700 text-center"
                    />
                  ) : (
                    player.survivalTime
                  )}
                </td>

                {/* Actions */}

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    {player.editing ? (
                      <button
                        onClick={() => handleSave(player)}
                        className="px-4 py-2 rounded-lg border border-green-500 text-green-400 hover:bg-green-500 hover:text-white flex items-center gap-2"
                      >
                        <FaSave />
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(player._id)}
                        className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black flex items-center gap-2"
                      >
                        <FaEdit />
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(player._id)}
                      className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white flex items-center gap-2"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

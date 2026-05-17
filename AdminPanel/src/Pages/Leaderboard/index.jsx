import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaEdit,
  FaSave,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const Leaderboard = () => {
  const location = useLocation();
  const tournament = location.state;

  const [players, setPlayers] = useState([
    { id: 1, rank: 1, name: "Akash", kills: 5, editing: false },
    { id: 2, rank: 2, name: "Rohit", kills: 2, editing: false },
    { id: 3, rank: 3, name: "Vikash", kills: 8, editing: false },
    { id: 5, rank: 4, name: "Hyphae", kills: 1, editing: false },
    { id: 6, rank: 5, name: "Goblin", kills: 1, editing: false },
    { id: 7, rank: 6, name: "Joker", kills: 1, editing: false },
    { id: 8, rank: 7, name: "Jonathan", kills: 1, editing: false },
    { id: 9, rank: 8, name: "Aman", kills: 1, editing: false },
    { id: 10, rank: 9, name: "Mortal", kills: 1, editing: false },
  ]);

  // ADD PLAYER STATES
  const [newPlayer, setNewPlayer] = useState("");
  const [newKills, setNewKills] = useState("");

  // SORT PLAYERS BY KILLS
  const sortPlayersByKills = (updatedPlayers) => {
    const sorted = [...updatedPlayers]
      .sort((a, b) => b.kills - a.kills)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));

    setPlayers(sorted);
  };

  // EDIT MODE
  const handleEdit = (id) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id
          ? { ...player, editing: !player.editing }
          : player
      )
    );
  };

  // CHANGE KILLS
  const handleKillChange = (id, value) => {
    const updatedPlayers = players.map((player) =>
      player.id === id
        ? { ...player, kills: Number(value) }
        : player
    );

    sortPlayersByKills(updatedPlayers);
  };

  // REMOVE PLAYER
  const handleRemove = (id) => {
    const updatedPlayers = players.filter(
      (player) => player.id !== id
    );

    sortPlayersByKills(updatedPlayers);
  };

  // ADD PLAYER
  const handleAddPlayer = () => {
    if (!newPlayer) return;

    const newEntry = {
      id: Date.now(),
      rank: players.length + 1,
      name: newPlayer,
      kills: Number(newKills) || 0,
      editing: false,
    };

    sortPlayersByKills([...players, newEntry]);

    setNewPlayer("");
    setNewKills("");
  };

  return (
    <div className="min-h-screen bg-[#0b0e16] text-white p-6">
      
      {/* HEADING */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        
        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            Leaderboard
          </h1>

          <p className="text-gray-400 mt-2">
            {tournament?.title}
          </p>
        </div>

        {/* ADD PLAYER */}
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Player Name"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#1a2033] border border-cyan-700 outline-none"
          />

          <input
            type="number"
            placeholder="Kills"
            value={newKills}
            onChange={(e) => setNewKills(e.target.value)}
            className="w-24 px-4 py-2 rounded-lg bg-[#1a2033] border border-cyan-700 outline-none"
          />

          <button
            onClick={handleAddPlayer}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold flex items-center gap-2"
          >
            <FaPlus />
            Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-cyan-700">
        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-[#10131f] text-cyan-300">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Player Name</th>
              <th className="px-6 py-4">Kills</th>
              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {players.map((player) => (
              <tr
                key={player.id}
                className="border-t border-cyan-900 hover:bg-[#111827] transition"
              >
                {/* RANK */}
                <td className="px-6 py-4 font-bold text-cyan-400">
                  #{player.rank}
                </td>

                {/* NAME */}
                <td className="px-6 py-4 font-semibold text-cyan-200">
                  {player.name}
                </td>

                {/* KILLS */}
                <td className="px-6 py-4">
                  {player.editing ? (
                    <input
                      type="number"
                      value={player.kills}
                      onChange={(e) =>
                        handleKillChange(
                          player.id,
                          e.target.value
                        )
                      }
                      className="w-24 px-3 py-2 rounded-lg bg-[#1a2033] border border-cyan-700 outline-none"
                    />
                  ) : (
                    <span className="text-white font-semibold">
                      {player.kills}
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">

                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(player.id)}
                      className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition flex items-center gap-2"
                    >
                      {player.editing ? (
                        <>
                          <FaSave />
                          Save
                        </>
                      ) : (
                        <>
                          <FaEdit />
                          Edit
                        </>
                      )}
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleRemove(player.id)
                      }
                      className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                    >
                      <FaTrash />
                      Remove
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
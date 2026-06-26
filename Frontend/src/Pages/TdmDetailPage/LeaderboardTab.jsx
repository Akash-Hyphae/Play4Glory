import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";

const LeaderBoardTab = () => {
  const { id } = useParams();
  const tournamentId = id;

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get(`/mvp/${tournamentId}`);

      setPlayers(res.data.players || []);
    } catch (error) {
      console.log(error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tournamentId) {
      fetchLeaderboard();
    }
  }, [tournamentId]);

  if (loading) {
    return (
      <div className="mt-6 bg-[#0f172a] rounded-xl p-6 border border-gray-700">
        <h2 className="text-center text-cyan-400 text-xl font-bold">
          Loading Leaderboard...
        </h2>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="mt-6 bg-[#0f172a] rounded-xl p-6 border border-gray-700">
        <h2 className="text-center text-cyan-400 text-xl font-bold">
          Leaderboard Not Available
        </h2>

        <p className="text-center text-gray-400 mt-3">
          Admin has not uploaded leaderboard yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-[#0f172a] rounded-xl p-6 border border-gray-700">

      <h2 className="text-xl font-semibold mb-4 text-white">
        MVP Players
      </h2>

      <table className="w-full text-left">

        <thead>
          <tr className="text-cyan-400 border-b border-gray-700">
            <th className="py-3">#</th>
            <th>Player</th>
            <th>Team</th>
            <th>Kills</th>
            <th>Damage</th>
            <th>Survival Time</th>
          </tr>
        </thead>

        <tbody>
          {players.map((player, index) => (
            <tr
              key={player._id}
              className="border-b border-gray-800 hover:bg-[#1e293b] transition"
            >
              <td className="py-4">
                {index + 1}
              </td>

              <td className="font-medium text-white">
                {player.playerName}
              </td>

              <td>
                {player.teamName}
              </td>

              <td className="text-cyan-400 font-semibold">
                {player.kills}
              </td>

              <td>
                {player.damage}
              </td>

              <td>
                {player.survivalTime}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default LeaderBoardTab;
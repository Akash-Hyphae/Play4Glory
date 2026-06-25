import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const MVPTable = ({ tournament }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchMVP = async () => {
      if (!tournament?._id) return;

      try {
        const res = await api.get(`/mvp/${tournament._id}`);

        const sortedPlayers = (res.data.players || [])
          .sort((a, b) => {
            if (b.kills !== a.kills) {
              return b.kills - a.kills;
            }

            if (b.damage !== a.damage) {
              return b.damage - a.damage;
            }

            return b.survivalTime - a.survivalTime;
          });

        setPlayers(sortedPlayers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMVP();
  }, [tournament]);

  if (!tournament) return null;

  return (
    <div className="mt-6 bg-[#0f172a] rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">
        MVP Players
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-cyan-400 border-b border-gray-700">
              <th className="py-3 px-3">Rank</th>
              <th className="px-3">Player</th>
              <th className="px-3">Team</th>
              <th className="px-3 text-center">Kills</th>
              <th className="px-3 text-center">Damage</th>
              <th className="px-3 text-center">Survival</th>
            </tr>
          </thead>

          <tbody>
            {players.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-400"
                >
                  No MVP data available
                </td>
              </tr>
            ) : (
              players.map((player, index) => (
                <tr
                  key={player._id}
                  className="border-b border-gray-800 hover:bg-[#1e293b] transition"
                >
                  <td className="py-4 px-3 font-bold text-cyan-400">
                    #{index + 1}
                  </td>

                  <td className="px-3 text-white font-medium">
                    {player.playerName}
                  </td>

                  <td className="px-3">
                    {player.teamName}
                  </td>

                  <td className="px-3 text-center text-cyan-400 font-semibold">
                    {player.kills}
                  </td>

                  <td className="px-3 text-center">
                    {player.damage}
                  </td>

                  <td className="px-3 text-center">
                    {player.survivalTime}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MVPTable;
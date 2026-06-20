import React, { useEffect, useState } from "react";
import api from "../../api/axios";;



const MVPTable = ({ tournament }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchMVP = async () => {
      try {
        const res = await api.get(
          `/mvp/${tournament._id}`
        );

        setPlayers(res.data.mvpPlayers);
      } catch (error) {
        console.log(error);
      }
    };

    if (tournament?._id) {
      fetchMVP();
    }
  }, [tournament]);

  if (!tournament) return null;
  return (
    <div className="mt-6 bg-[#0f172a] rounded-xl p-6 border border-gray-700">
      
      <h2 className="text-xl font-semibold mb-4 text-white">
        MVP Players
      </h2>

      <table className="w-full text-left">

        {/* Table Header */}
        <thead>
          <tr className="text-cyan-400 border-b border-gray-700">
            <th className="py-3">#</th>
            <th>Player</th>
            <th>Kills</th>
            <th>Damage</th>
            <th>Survival Time</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {players.map((player, index) => (
            <tr
              key={index}
              className="border-b border-gray-800 hover:bg-[#1e293b] transition"
            >
              <td className="py-4">{index + 1}</td>

              <td className="font-medium text-white">
                {player.playerName}
              </td>

              <td className="text-cyan-400">
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

export default MVPTable;
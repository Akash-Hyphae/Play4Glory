import React from "react";

const players = [
  { name: "Jonathan", kills: 24, damage: 4521, survival: "23m 10s" },
  { name: "Goblin", kills: 21, damage: 4210, survival: "22m 04s" },
  { name: "ScoutOP", kills: 20, damage: 3980, survival: "21m 45s" },
  { name: "Neyoo", kills: 18, damage: 3670, survival: "20m 30s" },
  { name: "ClutchGod", kills: 17, damage: 3510, survival: "19m 55s" },
  { name: "Mavi", kills: 16, damage: 3425, survival: "19m 20s" },
  { name: "Omega", kills: 15, damage: 3301, survival: "18m 10s" },
  { name: "AkshaT", kills: 14, damage: 3190, survival: "18m 02s" },
  { name: "Zgod", kills: 13, damage: 3005, survival: "17m 33s" },
  { name: "Punk", kills: 12, damage: 2890, survival: "17m 05s" },
];

const MVPTable = () => {
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
                {player.name}
              </td>

              <td className="text-cyan-400">
                {player.kills}
              </td>

              <td>
                {player.damage}
              </td>

              <td>
                {player.survival}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default MVPTable;
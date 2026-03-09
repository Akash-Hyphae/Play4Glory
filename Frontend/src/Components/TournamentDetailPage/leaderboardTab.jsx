import React, { useState, useMemo } from "react";

const groups = [
  "Group A",
  "Group B",
  "Group C",
  "Group D",
  "Semifinal-1",
  "Semifinal-2",
  "Final",
];

// Random Team Name Generator
const generateTeamName = () => {
  const words1 = ["Shadow", "Venom", "Rogue", "Blaze", "Phantom", "Nova", "Titan", "Viper"];
  const words2 = ["Squad", "Legends", "Warriors", "Hunters", "Elite", "Knights", "Reapers"];
  return (
    words1[Math.floor(Math.random() * words1.length)] +
    " " +
    words2[Math.floor(Math.random() * words2.length)]
  );
};

const LeaderBoardTab = () => {
  const [selectedGroup, setSelectedGroup] = useState("Group A");

  // Generate leaderboard data
  const leaderboardData = useMemo(() => {
    let data = [];

    for (let i = 1; i <= 16; i++) {
      const finish = Math.floor(Math.random() * 40);
      const placement = Math.floor(Math.random() * 40);
      const chicken = Math.floor(Math.random() * 5);

      data.push({
        position: i,
        team: generateTeamName(),
        finishPoints: finish,
        placementPoints: placement,
        chickenDinner: chicken,
        total: finish + placement,
      });
    }

    // Sort by total points descending
    return data.sort((a, b) => b.total - a.total);
  }, [selectedGroup]);

  return (
    <div className="w-full text-white">

      {/* GROUP BUTTONS */}
      <div className="flex flex-wrap gap-6 mb-6">
        {groups.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedGroup(cat)}
            className={`px-5 py-2 text-lg font-semibold rounded-lg border transition-all duration-300 ${
              selectedGroup === cat
                ? "border-cyan-500 bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                : "border-cyan-700 text-cyan-400 hover:bg-cyan-500 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-cyan-400">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Team</th>
              <th className="p-3">Placement</th>
              <th className="p-3">Finish</th>
              <th className="p-3">Chicken</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {leaderboardData.map((team, index) => {
              const isQualified = index < 8;
              const isFinal = selectedGroup === "Final";

              return (
                <tr
                  key={index}
                  className={`border-b border-gray-700 hover:bg-gray-900 transition`}
                  style={{
                    borderLeft: isFinal
                      ? index === 0
                        ? "5px solid gold"
                        : index === 1
                        ? "5px solid silver"
                        : index === 2
                        ? "5px solid #cd7f32"
                        : "5px solid transparent"
                      : isQualified
                      ? "5px solid #22c55e"
                      : "5px solid #ef4444",
                  }}
                >
                  <td className="p-3 font-bold">{index + 1}</td>
                  <td className="p-3">{team.team}</td>
                  <td className="p-3 text-center">{team.placementPoints}</td>
                  <td className="p-3 text-center">{team.finishPoints}</td>
                  <td className="p-3 text-center">{team.chickenDinner}</td>
                  <td className="p-3 text-center font-semibold text-cyan-400">
                    {team.total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default LeaderBoardTab;
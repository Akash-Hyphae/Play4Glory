import React, { useState, useEffect } from "react";
import api from "../../Api/axios";

const groups = [
"Group A",
"Group B",
"Group C",
"Group D",
"Semifinal-1",
"Semifinal-2",
"Final",
];

const groupMap = {
"Group A": "A",
"Group B": "B",
"Group C": "C",
"Group D": "D",
"Semifinal-1": "SF1",
"Semifinal-2": "SF2",
Final: "FINAL",
};

const LeaderBoardTab = ({ tournament }) => {
const [selectedGroup, setSelectedGroup] = useState("Group A");
const [groupedData, setGroupedData] = useState({
A: [],
B: [],
C: [],
D: [],
SF1: [],
SF2: [],
FINAL: [],
});

useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
      const res = await api.get(
        `/points-table/${tournament._id}`
      );

      setGroupedData(
        res.data.groupedData || {
          A: [],
          B: [],
          C: [],
          D: [],
          SF1: [],
          SF2: [],
          FINAL: [],
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (tournament?._id) {
    fetchLeaderboard();
  }
}, [tournament]);

if (!tournament) {
return null;
}

const currentData =
groupedData[groupMap[selectedGroup]] || [];

return ( <div className="w-full text-white">
{/* GROUP BUTTONS */} <div className="flex flex-wrap gap-6 mb-6">
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
{cat} </button>
))} </div>

```
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
        {currentData.map((team, index) => {
          const isQualified = index < 8;
          const isFinal = selectedGroup === "Final";

          return (
            <tr
              key={team._id}
              className="border-b border-gray-700 hover:bg-gray-900 transition"
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
              <td className="p-3 font-bold">
                {index + 1}
              </td>

              <td className="p-3">
                {team.team?.teamName}
              </td>

              <td className="p-3 text-center">
                {team.placementPoints}
              </td>

              <td className="p-3 text-center">
                {team.finishPoints}
              </td>

              <td className="p-3 text-center">
                {team.chickenDinners}
              </td>

              <td className="p-3 text-center font-semibold text-cyan-400">
                {team.totalPoints}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

)
};

export default LeaderBoardTab;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaSave } from "react-icons/fa";
import api from "../../Api/axios";

const groupMapping = {
  "Group A": "A",
  "Group B": "B",
  "Group C": "C",
  "Group D": "D",
  "Semifinal-1": "SF1",
  "Semifinal-2": "SF2",
  Final: "FINAL",
};

const PointsTable = () => {
  const { tournamentId } = useParams();

  const [activeGroup, setActiveGroup] =
    useState("Group A");

  const [groups, setGroups] = useState({
    "Group A": [],
    "Group B": [],
    "Group C": [],
    "Group D": [],
    "Semifinal-1": [],
    "Semifinal-2": [],
    Final: [],
  });

  const fetchPointsTable = async () => {
    try {
      const res = await api.get(
        `/points-table/${tournamentId}`
      );

      const data = res.data.groupedData;

      setGroups({
        "Group A": data.A || [],
        "Group B": data.B || [],
        "Group C": data.C || [],
        "Group D": data.D || [],
        "Semifinal-1": data.SF1 || [],
        "Semifinal-2": data.SF2 || [],
        Final: data.FINAL || [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPointsTable();
  }, []);

  const handleEdit = (id) => {
    const updated = { ...groups };

    updated[activeGroup] =
      updated[activeGroup].map((team) =>
        team._id === id
          ? {
              ...team,
              editing: !team.editing,
            }
          : team
      );

    setGroups(updated);
  };

  const handleChange = (
    id,
    field,
    value
  ) => {
    const updated = { ...groups };

    updated[activeGroup] =
      updated[activeGroup].map((team) => {
        if (team._id === id) {
          return {
            ...team,
            [field]: Number(value),
          };
        }

        return team;
      });

    setGroups(updated);
  };

  const handleSave = async (team) => {
    try {
      await api.put(
        `/points-table/${team._id}`,
        {
          placementPoints:
            team.placementPoints,
          finishPoints:
            team.finishPoints,
          chickenDinners:
            team.chickenDinners,
        }
      );

      fetchPointsTable();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 md:px-8 py-6">

      <div className="border border-cyan-700 rounded-[30px] bg-[#070d22] p-5">

        {/* GROUP BUTTONS */}

        <div className="flex flex-wrap gap-4 mb-8">
          {Object.keys(groups).map(
            (group) => (
              <button
                key={group}
                onClick={() =>
                  setActiveGroup(group)
                }
                className={`px-6 py-3 rounded-xl border border-cyan-500 ${
                  activeGroup === group
                    ? "bg-cyan-400 text-black"
                    : "text-cyan-400"
                }`}
              >
                {group}
              </button>
            )
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-[#1a2438] text-cyan-400">
                <th className="p-4">
                  Rank
                </th>
                <th className="p-4">
                  Team
                </th>
                <th className="p-4">
                  Placement
                </th>
                <th className="p-4">
                  Finish
                </th>
                <th className="p-4">
                  Chicken
                </th>
                <th className="p-4">
                  Total
                </th>
                <th className="p-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {groups[activeGroup]
                .sort(
                  (a, b) =>
                    b.totalPoints -
                    a.totalPoints
                )
                .map((team, index) => (
                  <tr
                    key={team._id}
                    className="border-b border-gray-700"
                  >
                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4">
                      {
                        team.team
                          ?.teamName
                      }
                    </td>

                    <td className="p-4">
                      {team.editing ? (
                        <input
                          type="number"
                          value={
                            team.placementPoints
                          }
                          onChange={(e) =>
                            handleChange(
                              team._id,
                              "placementPoints",
                              e.target.value
                            )
                          }
                          className="bg-black px-2 py-1 rounded"
                        />
                      ) : (
                        team.placementPoints
                      )}
                    </td>

                    <td className="p-4">
                      {team.editing ? (
                        <input
                          type="number"
                          value={
                            team.finishPoints
                          }
                          onChange={(e) =>
                            handleChange(
                              team._id,
                              "finishPoints",
                              e.target.value
                            )
                          }
                          className="bg-black px-2 py-1 rounded"
                        />
                      ) : (
                        team.finishPoints
                      )}
                    </td>

                    <td className="p-4">
                      {team.editing ? (
                        <input
                          type="number"
                          value={
                            team.chickenDinners
                          }
                          onChange={(e) =>
                            handleChange(
                              team._id,
                              "chickenDinners",
                              e.target.value
                            )
                          }
                          className="bg-black px-2 py-1 rounded"
                        />
                      ) : (
                        team.chickenDinners
                      )}
                    </td>

                    <td className="p-4 text-cyan-400 font-bold">
                      {
                        team.totalPoints
                      }
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => {
                          if (
                            team.editing
                          ) {
                            handleSave(
                              team
                            );
                          }

                          handleEdit(
                            team._id
                          );
                        }}
                        className="px-4 py-2 border border-cyan-500 rounded-lg flex items-center gap-2"
                      >
                        {team.editing ? (
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
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;
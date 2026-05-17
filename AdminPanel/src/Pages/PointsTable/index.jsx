import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

const createTeams = (prefix) => {
  return Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    team: `${prefix} Team ${i + 1}`,
    placement: 0,
    finish: 0,
    chicken: 0,
    total: 0,
    editing: false,
  }));
};

const initialGroups = {
  "Group A": createTeams("A"),
  "Group B": createTeams("B"),
  "Group C": createTeams("C"),
  "Group D": createTeams("D"),
  "Semifinal-1": [],
  "Semifinal-2": [],
  Final: [],
};

const PointsTable = () => {
  const [activeGroup, setActiveGroup] =
    useState("Group A");

  const [groups, setGroups] =
    useState(initialGroups);

  // SORT TEAMS
  const sortTeams = (teams) => {
    return [...teams].sort((a, b) => {

      // SORT BY TOTAL
      if (b.total !== a.total) {
        return b.total - a.total;
      }

      // IF TOTAL SAME -> SORT BY CHICKEN
      return b.chicken - a.chicken;
    });
  };

  // UPDATE SEMIFINALS + FINAL
  const updateSemiFinals = (allGroups) => {

    const topA = sortTeams(
      allGroups["Group A"]
    ).slice(0, 8);

    const topB = sortTeams(
      allGroups["Group B"]
    ).slice(0, 8);

    const topC = sortTeams(
      allGroups["Group C"]
    ).slice(0, 8);

    const topD = sortTeams(
      allGroups["Group D"]
    ).slice(0, 8);

    // SEMIFINAL 1
    allGroups["Semifinal-1"] =
      sortTeams([...topA, ...topB]);

    // SEMIFINAL 2
    allGroups["Semifinal-2"] =
      sortTeams([...topC, ...topD]);

    // FINAL
    const semi1Top =
      allGroups["Semifinal-1"].slice(0, 8);

    const semi2Top =
      allGroups["Semifinal-2"].slice(0, 8);

    allGroups["Final"] = sortTeams([
      ...semi1Top,
      ...semi2Top,
    ]);
  };

  // EDIT MODE
  const handleEdit = (teamId) => {

    const updatedGroups = { ...groups };

    updatedGroups[activeGroup] =
      updatedGroups[activeGroup].map((team) =>
        team.id === teamId
          ? {
              ...team,
              editing: !team.editing,
            }
          : team
      );

    setGroups(updatedGroups);

    updateSemiFinals(updatedGroups);
  };

  // HANDLE CHANGE
  const handleChange = (
    teamId,
    field,
    value
  ) => {

    const updatedGroups = { ...groups };

    const updatedTeams =
      updatedGroups[activeGroup].map((team) => {

        if (team.id === teamId) {

          const updatedTeam = {
            ...team,
            [field]: Number(value),
          };

          // TOTAL = PLACEMENT + FINISH
          updatedTeam.total =
            updatedTeam.placement +
            updatedTeam.finish;

          return updatedTeam;
        }

        return team;
      });

    updatedGroups[activeGroup] =
      sortTeams(updatedTeams);

    setGroups(updatedGroups);

    updateSemiFinals(updatedGroups);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 md:px-8 py-6">

      {/* MAIN CONTAINER */}
      <div className="border border-cyan-700 rounded-[30px] bg-[#070d22] p-5 shadow-[0_0_25px_#00ffff15]">

        {/* GROUP BUTTONS */}
        <div className="flex flex-wrap gap-4 mb-8">

          {Object.keys(groups).map((group) => (

            <button
              key={group}
              onClick={() =>
                setActiveGroup(group)
              }
              className={`px-7 py-3 rounded-xl border border-cyan-500 text-[16px] font-semibold transition-all duration-300 ${
                activeGroup === group
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_#00ffff]"
                  : "text-cyan-400 hover:bg-cyan-500 hover:text-black"
              }`}
            >
              {group}
            </button>

          ))}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            {/* HEADER */}
            <thead>

              <tr className="bg-[#1a2438] text-cyan-400 text-[15px]">

                <th className="py-4 px-4 text-left">
                  #
                </th>

                <th className="py-4 px-4 text-left">
                  Team
                </th>

                <th className="py-4 px-4 text-center">
                  Placement
                </th>

                <th className="py-4 px-4 text-center">
                  Finish
                </th>

                <th className="py-4 px-4 text-center">
                  Chicken
                </th>

                <th className="py-4 px-4 text-center">
                  Total
                </th>

                <th className="py-4 px-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {groups[activeGroup].map(
                (team, index) => (

                  <tr
                    key={index}
                    className="border-b border-[#26314d]"
                  >

                    {/* RANK */}
                    <td className="relative py-4 px-4 text-[16px] font-bold">

                      {/* LEFT BAR */}
                      <div
                        className={`absolute left-0 top-0 h-full w-[5px] ${
                          index < 8
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>

                      {index + 1}

                    </td>

                    {/* TEAM */}
                    <td className="py-4 px-4 text-[16px] font-semibold">
                      {team.team}
                    </td>

                    {/* PLACEMENT */}
                    <td className="py-4 px-4 text-center">

                      {team.editing ? (
                        <input
                          type="number"
                          value={team.placement}
                          onChange={(e) =>
                            handleChange(
                              team.id,
                              "placement",
                              e.target.value
                            )
                          }
                          className="w-20 bg-[#121826] border border-cyan-700 rounded-lg px-2 py-1 text-center outline-none text-sm"
                        />
                      ) : (
                        <span className="text-[15px]">
                          {team.placement}
                        </span>
                      )}

                    </td>

                    {/* FINISH */}
                    <td className="py-4 px-4 text-center">

                      {team.editing ? (
                        <input
                          type="number"
                          value={team.finish}
                          onChange={(e) =>
                            handleChange(
                              team.id,
                              "finish",
                              e.target.value
                            )
                          }
                          className="w-20 bg-[#121826] border border-cyan-700 rounded-lg px-2 py-1 text-center outline-none text-sm"
                        />
                      ) : (
                        <span className="text-[15px]">
                          {team.finish}
                        </span>
                      )}

                    </td>

                    {/* CHICKEN */}
                    <td className="py-4 px-4 text-center">

                      {team.editing ? (
                        <input
                          type="number"
                          value={team.chicken}
                          onChange={(e) =>
                            handleChange(
                              team.id,
                              "chicken",
                              e.target.value
                            )
                          }
                          className="w-20 bg-[#121826] border border-cyan-700 rounded-lg px-2 py-1 text-center outline-none text-sm"
                        />
                      ) : (
                        <span className="text-[15px]">
                          {team.chicken}
                        </span>
                      )}

                    </td>

                    {/* TOTAL */}
                    <td className="py-4 px-4 text-center text-cyan-400 text-[18px] font-bold">
                      {team.total}
                    </td>

                    {/* ACTION */}
                    <td className="py-4 px-4 text-center">

                      <button
                        onClick={() =>
                          handleEdit(team.id)
                        }
                        className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition flex items-center gap-2 mx-auto text-sm"
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
                )
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;
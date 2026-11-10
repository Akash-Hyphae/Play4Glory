import React, { useEffect, useState } from "react";
import api from "../../Api/axios";

const TeamsTab = ({ tournament }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await api.get(`/registrations/${tournament._id}`);
        setTeams(res.data.registrations || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (tournament?._id) {
      fetchTeams();
    }
  }, [tournament]);

  if (loading) {
    return <p className="text-cyan-400 py-6 text-center">Loading registered squads...</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-white mb-6 font-[Orbitron]">
        Registered Teams ({teams.length})
      </h2>

      {teams.length === 0 ? (
        <p className="text-gray-400">No teams registered yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <div
              key={team._id || index}
              className="bg-[#0f172a] border border-gray-700 rounded-xl p-5 hover:border-cyan-400 hover:shadow-[0_0_20px_#06b6d433] transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-cyan-400 font-[Orbitron] truncate">
                    {team.teamName}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">
                    #{index + 1}
                  </span>
                </div>

                <div className="text-xs text-gray-400 mb-4 pb-3 border-b border-gray-800">
                  <span>Registered By: </span>
                  <span className="text-white font-semibold">
                    {team.registeredBy?.displayName || "Captain"}
                  </span>
                </div>

                {/* ALL 5 PLAYERS */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Squad Lineup:
                  </p>

                  {team.players && team.players.length > 0 ? (
                    team.players.map((player, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-[#141c2e] px-3 py-2 rounded-lg flex justify-between items-center text-xs border border-gray-800"
                      >
                        <div className="truncate mr-2">
                          <span className="text-cyan-400 font-bold mr-1.5">
                            {pIdx === 4 ? "Sub:" : `P${pIdx + 1}:`}
                          </span>
                          <span className="text-white font-medium">
                            {player.name || "Player " + (pIdx + 1)}
                          </span>
                        </div>

                        <div className="text-right text-[11px] text-gray-400 shrink-0">
                          <span className="text-cyan-300 font-semibold">{player.ign}</span>
                          {player.gameId && (
                            <span className="ml-1 text-gray-400">({player.gameId})</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#141c2e] p-3 rounded-lg text-xs text-gray-400">
                      Captain IGN: <strong className="text-cyan-300">{team.registeredBy?.inGameName || "Direct Entry"}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsTab;
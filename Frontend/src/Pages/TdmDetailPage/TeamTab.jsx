import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const TeamTab = ({ tournamentId }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await api.get(
          `/team-registration/${tournamentId}`
        );

        setTeams(res.data.registrations);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [tournamentId]);

  if (loading) {
    return (
      <div className="text-white">
        Loading Teams...
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Registered Teams
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team._id}
            className="bg-[#0f172a] border border-gray-700 rounded-xl p-6
            hover:border-cyan-400 hover:shadow-[0_0_20px_#06b6d4]
            transition duration-300"
          >
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">
              {team.teamName}
            </h3>

            <div className="text-gray-300">
              Registered By:
              <div className="mt-2 text-cyan-300">
                {team.registeredBy?.displayName}
              </div>

              <div className="text-sm text-gray-400 mt-1">
                {team.registeredBy?.inGameName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTab;
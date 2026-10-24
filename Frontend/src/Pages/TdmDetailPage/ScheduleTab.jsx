import React, { useEffect, useState } from "react";
import api from "../../Api/axios";
import { useParams } from "react-router-dom";

const ScheduleTab = ({ tournamentId: propTournamentId }) => {
  const { id: paramId } = useParams();
  const tournamentId = propTournamentId || paramId;

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tournamentId) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/tdm-matches/${tournamentId}`);
        setMatches(Array.isArray(res.data.matches) ? res.data.matches : []);
      } catch (error) {
        console.log(error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tournamentId]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <h1 className="text-2xl text-cyan-400 font-bold animate-pulse">
          Loading Fixture Bracket...
        </h1>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="py-16 text-center bg-[#0a0f1d] rounded-2xl border border-cyan-900/60 p-8">
        <h2 className="text-2xl font-bold text-cyan-400">
          Bracket Not Generated Yet
        </h2>
        <p className="mt-2 text-gray-400 text-sm">
          The match schedule & knockout bracket will appear here as soon as the organizer finalizes team registrations.
        </p>
      </div>
    );
  }

  // Dynamically group matches by round
  const groupedRounds = matches.reduce((acc, match) => {
    acc[match.round] = acc[match.round] || [];
    acc[match.round].push(match);
    return acc;
  }, {});

  const totalRounds = Object.keys(groupedRounds).length;

  const getRoundLabel = (roundNum, total) => {
    const diff = total - roundNum;
    if (diff === 0) return "FINAL";
    if (diff === 1) return "Semi Finals";
    if (diff === 2) return "Quarter Finals";
    return `Round ${roundNum}`;
  };

  return (
    <div className="w-full text-white">
      {/* Title */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Knockout Bracket</h2>
          <p className="text-gray-400 text-xs mt-1">
            {matches[0]?.round === 1 ? matches.filter((m) => m.round === 1).length * 2 : 0} Teams Single Elimination
          </p>
        </div>
      </div>

      {/* Bracket Columns */}
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-8 min-w-max">
          {Object.entries(groupedRounds).map(([roundNumStr, roundMatches]) => {
            const roundNum = parseInt(roundNumStr, 10);
            const isFinal = roundNum === totalRounds;

            return (
              <div key={roundNum} className="w-72 flex flex-col">
                <h3
                  className={`text-center font-bold text-lg mb-6 pb-2 border-b ${
                    isFinal
                      ? "text-yellow-400 border-yellow-500"
                      : "text-cyan-400 border-cyan-800"
                  }`}
                >
                  {getRoundLabel(roundNum, totalRounds)}
                </h3>

                <div
                  className="flex flex-col justify-around flex-1"
                  style={{ gap: `${Math.pow(2, roundNum - 1) * 1.25}rem` }}
                >
                  {roundMatches.map((match) => (
                    <div
                      key={match._id}
                      className={`bg-[#10131f] rounded-xl border p-4 shadow-md transition duration-200 ${
                        isFinal
                          ? "border-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                          : "border-cyan-800/80 hover:border-cyan-500"
                      }`}
                    >
                      <div className="text-[11px] text-gray-500 mb-2 flex justify-between">
                        <span>Match #{match.matchNumber}</span>
                        <span
                          className={`font-semibold ${
                            match.status === "completed"
                              ? "text-green-400"
                              : match.status === "live"
                              ? "text-cyan-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {match.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Team A */}
                      <div className="flex justify-between items-center py-1">
                        <span
                          className={`text-sm font-semibold truncate max-w-[180px] ${
                            match.winner?._id === match.teamA?._id
                              ? "text-green-400 font-bold"
                              : "text-gray-200"
                          }`}
                        >
                          {match.teamA?.teamName || "TBD"}
                        </span>
                        {match.winner && match.teamA && match.winner._id === match.teamA._id && (
                          <span className="text-green-400 text-xs font-bold">✔</span>
                        )}
                      </div>

                      <div className="border-b border-gray-800 my-2"></div>

                      {/* Team B */}
                      <div className="flex justify-between items-center py-1">
                        <span
                          className={`text-sm font-semibold truncate max-w-[180px] ${
                            match.winner?._id === match.teamB?._id
                              ? "text-green-400 font-bold"
                              : "text-gray-200"
                          }`}
                        >
                          {match.teamB?.teamName || "TBD"}
                        </span>
                        {match.winner && match.teamB && match.winner._id === match.teamB._id && (
                          <span className="text-green-400 text-xs font-bold">✔</span>
                        )}
                      </div>

                      {/* Winner Display */}
                      {match.winner && (
                        <div className="mt-3 pt-2 border-t border-gray-800 text-center text-xs font-bold text-green-400 truncate">
                          🏆 {match.winner.teamName}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {isFinal && roundMatches[0]?.winner && (
                  <div className="mt-6 bg-[#111827] border-2 border-yellow-500 rounded-xl p-4 text-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <p className="text-yellow-400 font-bold text-xs tracking-wider">
                      CHAMPION
                    </p>
                    <p className="text-xl font-extrabold text-green-400 mt-1 truncate">
                      {roundMatches[0].winner.teamName}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTab;
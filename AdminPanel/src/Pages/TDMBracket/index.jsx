import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api/axios";

const TDMBracket = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [tournament, setTournament] = useState(null);

  const fetchTournamentData = async () => {
    try {
      const [tournRes, matchRes] = await Promise.all([
        api.get(`/tournaments/${tournamentId}`),
        api.get(`/tdm-matches/${tournamentId}`),
      ]);
      setTournament(tournRes.data.tournament);
      setMatches(matchRes.data.matches || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournamentData();
  }, [tournamentId]);

  const generateBracket = async () => {
    try {
      setGenerating(true);
      const res = await api.post(`/tdm-matches/generate/${tournamentId}`);
      alert(res.data.message || "Bracket generated successfully!");
      fetchTournamentData();
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to generate knockout bracket"
      );
    } finally {
      setGenerating(false);
    }
  };

  const declareWinner = async (matchId, winnerId) => {
    try {
      await api.put(`/tdm-matches/winner/${matchId}`, {
        winner: winnerId,
      });
      fetchTournamentData();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to declare winner");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex justify-center items-center text-cyan-400 text-2xl font-bold">
        Loading TDM Knockout Bracket...
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
    <div className="min-h-screen bg-[#050816] text-white p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-cyan-400">
            TDM Knockout Fixture
          </h1>
          <p className="text-gray-400 mt-1">
            Tournament: <span className="text-cyan-300">{tournament?.title}</span> ({tournament?.filledSlots || 0} Registered Teams)
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-600 hover:border-cyan-400 rounded-xl text-gray-300 hover:text-white transition cursor-pointer"
          >
            ← Back
          </button>

          {matches.length === 0 && (
            <button
              onClick={generateBracket}
              disabled={generating}
              className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition disabled:opacity-50 cursor-pointer"
            >
              {generating ? "Generating..." : "Generate Bracket"}
            </button>
          )}
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="bg-[#10131f] border border-cyan-800 rounded-2xl p-12 text-center max-w-xl mx-auto my-12">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">No Bracket Found</h2>
          <p className="text-gray-400 mb-6">
            Generate the fixture bracket once teams finish registering (Supports 8, 16, 32, or 64 teams).
          </p>
          <button
            onClick={generateBracket}
            disabled={generating}
            className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition cursor-pointer"
          >
            {generating ? "Generating..." : "Generate Bracket Now"}
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto pb-8">
          <div className="flex gap-12 min-w-max">
            {Object.entries(groupedRounds).map(([roundNumStr, roundMatches]) => {
              const roundNum = parseInt(roundNumStr, 10);
              const isFinal = roundNum === totalRounds;

              return (
                <div key={roundNum} className="w-80 flex flex-col">
                  {/* Round Heading */}
                  <h2
                    className={`text-center font-bold text-xl mb-6 pb-2 border-b ${
                      isFinal
                        ? "text-yellow-400 border-yellow-500"
                        : "text-cyan-400 border-cyan-800"
                    }`}
                  >
                    {getRoundLabel(roundNum, totalRounds)}
                  </h2>

                  {/* Matches Column */}
                  <div
                    className="flex flex-col justify-around flex-1"
                    style={{ gap: `${Math.pow(2, roundNum - 1) * 1.5}rem` }}
                  >
                    {roundMatches.map((match) => (
                      <div
                        key={match._id}
                        className={`bg-[#111827] rounded-xl border p-4 shadow-lg transition duration-200 ${
                          isFinal
                            ? "border-yellow-500/80 shadow-[0_0_20px_rgba(234,179,8,0.25)]"
                            : "border-cyan-800 hover:border-cyan-500"
                        }`}
                      >
                        <div className="text-xs text-gray-500 mb-2 flex justify-between">
                          <span>Match #{match.matchNumber}</span>
                          <span
                            className={
                              match.status === "completed"
                                ? "text-green-400"
                                : "text-yellow-400"
                            }
                          >
                            {match.status.toUpperCase()}
                          </span>
                        </div>

                        {/* Team A */}
                        <div className="flex justify-between items-center py-1">
                          <span
                            className={`font-semibold truncate max-w-[170px] ${
                              match.winner?._id === match.teamA?._id
                                ? "text-green-400 font-bold"
                                : "text-gray-200"
                            }`}
                          >
                            {match.teamA?.teamName || "TBD"}
                          </span>

                          {!match.winner && match.teamA && (
                            <button
                              onClick={() => declareWinner(match._id, match.teamA._id)}
                              className="text-xs px-2.5 py-1 rounded bg-green-500 hover:bg-green-400 text-black font-bold transition cursor-pointer"
                            >
                              WIN
                            </button>
                          )}
                        </div>

                        <div className="border-b border-gray-800 my-2"></div>

                        {/* Team B */}
                        <div className="flex justify-between items-center py-1">
                          <span
                            className={`font-semibold truncate max-w-[170px] ${
                              match.winner?._id === match.teamB?._id
                                ? "text-green-400 font-bold"
                                : "text-gray-200"
                            }`}
                          >
                            {match.teamB?.teamName || "TBD"}
                          </span>

                          {!match.winner && match.teamB && (
                            <button
                              onClick={() => declareWinner(match._id, match.teamB._id)}
                              className="text-xs px-2.5 py-1 rounded bg-green-500 hover:bg-green-400 text-black font-bold transition cursor-pointer"
                            >
                              WIN
                            </button>
                          )}
                        </div>

                        {/* Winner */}
                        {match.winner && (
                          <div className="mt-3 pt-2 border-t border-gray-800 text-center text-sm font-bold text-green-400 truncate">
                            🏆 {match.winner.teamName}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Champion Banner on Final */}
                  {isFinal && roundMatches[0]?.winner && (
                    <div className="mt-8 bg-[#111827] border-2 border-yellow-500 rounded-xl p-5 text-center shadow-[0_0_25px_rgba(234,179,8,0.4)]">
                      <p className="text-yellow-400 font-bold text-sm tracking-wider">
                        CHAMPION
                      </p>
                      <p className="text-2xl font-extrabold text-green-400 mt-1 truncate">
                        {roundMatches[0].winner.teamName}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TDMBracket;
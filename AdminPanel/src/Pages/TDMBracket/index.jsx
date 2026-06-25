import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Api/axios";

const TDMBracket = () => {
  const { tournamentId } = useParams();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchMatches = async () => {
    try {
      const res = await api.get(
        `/tdm-matches/${tournamentId}`
      );

      setMatches(res.data.matches || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const generateBracket = async () => {
    try {
      setGenerating(true);

      await api.post(
        `/tdm-matches/generate/${tournamentId}`
      );

      fetchMatches();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to generate bracket"
      );
    } finally {
      setGenerating(false);
    }
  };

  const declareWinner = async (
    matchId,
    winnerId
  ) => {
    try {
      await api.put(
        `/tdm-matches/winner/${matchId}`,
        {
          winner: winnerId,
        }
      );

      fetchMatches();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to declare winner"
      );
    }
  };

  const round1 = matches.filter(
    (m) => m.round === 1
  );

  const round2 = matches.filter(
    (m) => m.round === 2
  );

  const round3 = matches.filter(
    (m) => m.round === 3
  );

  const quarter = matches.filter(
    (m) => m.round === 4
  );

  const semi = matches.filter(
    (m) => m.round === 5
  );

  const final = matches.filter(
    (m) => m.round === 6
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex justify-center items-center text-cyan-400 text-2xl">
        Loading Bracket...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-cyan-400">
          TDM Knockout Fixture
        </h1>

        {matches.length === 0 && (
          <button
            onClick={generateBracket}
            disabled={generating}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition"
          >
            {generating
              ? "Generating..."
              : "Generate Bracket"}
          </button>
        )}

      </div>

      <div className="overflow-x-auto">

        <div className="flex gap-16 min-w-[2600px]">

          {/* ROUND 1 */}

          <div className="w-80">

            <h2 className="text-center text-cyan-400 text-xl font-bold mb-8">
              Round 1
            </h2>

            <div className="space-y-8">

              {round1.map((match) => (

                <div
                  key={match._id}
                  className="bg-[#111827] rounded-xl border border-cyan-700 p-4 shadow-lg"
                >

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamA?.teamName ||
                        "TBD"}
                    </span>

                    {!match.winner && match.teamA && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamA._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  <div className="border-b border-cyan-900 my-3"></div>

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamB?.teamName ||
                        "TBD"}
                    </span>

                    {!match.winner && match.teamB && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamB._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  {match.winner && (
                    <div className="mt-4 text-center text-green-400 font-bold">
                      Winner :
                      {" "}
                      {match.winner.teamName}
                    </div>
                  )}

                </div>

              ))}

            </div>

          </div>
                  {/* ROUND 2 */}

          <div className="w-80">

            <h2 className="text-center text-cyan-400 text-xl font-bold mb-8">
              Round 2
            </h2>

            <div className="space-y-20">

              {round2.map((match) => (

                <div
                  key={match._id}
                  className="bg-[#111827] rounded-xl border border-cyan-700 p-4 shadow-lg"
                >

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamA?.teamName || "TBD"}
                    </span>

                    {!match.winner && match.teamA && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamA._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  <div className="border-b border-cyan-900 my-3"></div>

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamB?.teamName || "TBD"}
                    </span>

                    {!match.winner && match.teamB && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamB._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  {match.winner && (
                    <div className="mt-4 text-center text-green-400 font-bold">
                      Winner : {match.winner.teamName}
                    </div>
                  )}

                </div>

              ))}

            </div>

          </div>

          {/* ROUND 3 */}

          <div className="w-80">

            <h2 className="text-center text-cyan-400 text-xl font-bold mb-8">
              Round 3
            </h2>

            <div className="space-y-40">

              {round3.map((match) => (

                <div
                  key={match._id}
                  className="bg-[#111827] rounded-xl border border-cyan-700 p-4 shadow-lg"
                >

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamA?.teamName || "TBD"}
                    </span>

                    {!match.winner && match.teamA && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamA._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  <div className="border-b border-cyan-900 my-3"></div>

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamB?.teamName || "TBD"}
                    </span>

                    {!match.winner && match.teamB && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamB._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  {match.winner && (
                    <div className="mt-4 text-center text-green-400 font-bold">
                      Winner : {match.winner.teamName}
                    </div>
                  )}

                </div>

              ))}

            </div>

          </div>

          {/* QUARTER FINALS */}

          <div className="w-80">

            <h2 className="text-center text-cyan-400 text-xl font-bold mb-8">
              Quarter Finals
            </h2>

            <div className="space-y-72">

              {quarter.map((match) => (

                <div
                  key={match._id}
                  className="bg-[#111827] rounded-xl border border-cyan-700 p-4 shadow-lg"
                >

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamA?.teamName || "TBD"}
                    </span>

                    {!match.winner && match.teamA && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamA._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  <div className="border-b border-cyan-900 my-3"></div>

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamB?.teamName || "TBD"}
                    </span>

                    {!match.winner && match.teamB && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamB._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  {match.winner && (
                    <div className="mt-4 text-center text-green-400 font-bold">
                      Winner : {match.winner.teamName}
                    </div>
                  )}

                </div>

              ))}

            </div>

          </div>
                    {/* SEMI FINALS */}

          <div className="w-80">

            <h2 className="text-center text-cyan-400 text-xl font-bold mb-8">
              Semi Finals
            </h2>

            <div className="space-y-[34rem]">

              {semi.map((match) => (

                <div
                  key={match._id}
                  className="bg-[#111827] rounded-xl border border-cyan-700 p-4 shadow-lg"
                >

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamA?.teamName || "TBD"}
                    </span>

                    {!match.winner && match.teamA && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamA._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  <div className="border-b border-cyan-900 my-3"></div>

                  <div className="flex justify-between items-center">

                    <span>
                      {match.teamB?.teamName || "TBD"}
                    </span>

                    {!match.winner && match.teamB && (
                      <button
                        onClick={() =>
                          declareWinner(
                            match._id,
                            match.teamB._id
                          )
                        }
                        className="text-xs px-3 py-1 rounded bg-green-500 text-black font-semibold"
                      >
                        WIN
                      </button>
                    )}

                  </div>

                  {match.winner && (
                    <div className="mt-4 text-center text-green-400 font-bold">
                      Winner : {match.winner.teamName}
                    </div>
                  )}

                </div>

              ))}

            </div>

          </div>

          {/* FINAL */}

          <div className="w-80 flex flex-col justify-center">

            <h2 className="text-center text-yellow-400 text-2xl font-bold mb-10">
              FINAL
            </h2>

            {final.length > 0 && (

              <div
                className="bg-[#111827] rounded-xl border-2 border-yellow-500 p-5 shadow-[0_0_30px_rgba(234,179,8,.3)]"
              >

                <div className="flex justify-between items-center">

                  <span className="font-semibold">
                    {final[0].teamA?.teamName || "TBD"}
                  </span>

                  {!final[0].winner && final[0].teamA && (
                    <button
                      onClick={() =>
                        declareWinner(
                          final[0]._id,
                          final[0].teamA._id
                        )
                      }
                      className="px-3 py-1 rounded bg-green-500 text-black text-xs font-bold"
                    >
                      WIN
                    </button>
                  )}

                </div>

                <div className="border-b border-yellow-700 my-4"></div>

                <div className="flex justify-between items-center">

                  <span className="font-semibold">
                    {final[0].teamB?.teamName || "TBD"}
                  </span>

                  {!final[0].winner && final[0].teamB && (
                    <button
                      onClick={() =>
                        declareWinner(
                          final[0]._id,
                          final[0].teamB._id
                        )
                      }
                      className="px-3 py-1 rounded bg-green-500 text-black text-xs font-bold"
                    >
                      WIN
                    </button>
                  )}

                </div>

                {final[0].winner && (

                  <div className="mt-8 text-center">

                    <h3 className="text-yellow-400 text-lg font-bold">
                      🏆 Champion
                    </h3>

                    <p className="text-3xl text-green-400 font-extrabold mt-3">
                      {final[0].winner.teamName}
                    </p>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default TDMBracket;
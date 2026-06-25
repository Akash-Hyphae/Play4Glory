import React, { useEffect, useState } from "react";
import api from "../../Api/axios";
import { useParams } from "react-router-dom";

const ScheduleTab = () => {
  const { id } = useParams();
  const tournamentId = id;

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tournament, setTournament] = useState(null);

  // ===============================
  // Fetch Bracket
  // ===============================

  const fetchTournament = async () => {
    console.log("Fetching tournament");

    try {
      const res = await api.get(`/tournaments/${tournamentId}`);
      setTournament(res.data.tournament);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBracket = async () => {
    console.log("Fetching bracket");
    try {
      const res = await api.get(`/tdm-matches/${tournamentId}`);

      console.log("Bracket API:", res.data);

      setMatches(Array.isArray(res.data.matches) ? res.data.matches : []);
    } catch (error) {
      console.log("Bracket Error:", error.response?.data || error);
      setMatches([]);
    }
  };
  useEffect(() => {
    console.log("Tournament ID:", tournamentId);
    if (!tournamentId) return;

    const loadData = async () => {
      setLoading(true);

      try {
        await Promise.all([fetchTournament(), fetchBracket()]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tournamentId]);

  // ===============================
  // Separate rounds
  // ===============================

  const round1 = matches.filter((match) => match.round === 1);

  const round2 = matches.filter((match) => match.round === 2);

  const round3 = matches.filter((match) => match.round === 3);

  const quarter = matches.filter((match) => match.round === 4);

  const semi = matches.filter((match) => match.round === 5);

  const final = matches.filter((match) => match.round === 6);

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex justify-center items-center">
        <h1 className="text-3xl text-cyan-400 font-bold animate-pulse">
          Loading Bracket...
        </h1>
      </div>
    );
  }

  console.log("Tournament:", tournament);
  console.log("Matches:", matches.length);
  console.log(matches);

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-[#050816] flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-cyan-400">
            Bracket Not Generated
          </h1>

          <p className="mt-3 text-gray-400">
            Admin has not generated the knockout bracket yet.
          </p>
        </div>
      </div>
    );
  }
  // ===============================
  // Match Card (User View)
  // ===============================

  const MatchCard = ({ match }) => (
    <div
      className="
      w-72
      bg-[#10131f]
      border
      border-cyan-700
      rounded-2xl
      p-4
      shadow-[0_0_18px_rgba(0,255,255,.15)]
      hover:shadow-[0_0_30px_rgba(0,255,255,.30)]
      transition-all
      duration-300
      "
    >
      {/* Team A */}

      <div className="flex justify-between items-center py-2">
        <span className="font-semibold text-gray-200">
          {match.teamA?.teamName || "TBD"}
        </span>

        {match.winner &&
          match.teamA &&
          match.winner._id === match.teamA._id && (
            <span className="text-green-400 font-bold">✔</span>
          )}
      </div>

      <div className="border-b border-cyan-900"></div>

      {/* Team B */}

      <div className="flex justify-between items-center py-2">
        <span className="font-semibold text-gray-200">
          {match.teamB?.teamName || "TBD"}
        </span>

        {match.winner &&
          match.teamB &&
          match.winner._id === match.teamB._id && (
            <span className="text-green-400 font-bold">✔</span>
          )}
      </div>

      {/* Winner */}

      {match.winner && (
        <div className="mt-4 text-center">
          <span className="text-green-400 font-bold text-lg">
            🏆 {match.winner.teamName}
          </span>
        </div>
      )}

      {/* Status */}

      <div className="mt-4 text-center">
        <span
          className={`text-sm font-bold ${
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

      {/* Time */}

      {match.matchTime && (
        <div className="mt-2 text-center text-gray-400 text-xs">
          {new Date(match.matchTime).toLocaleString()}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 overflow-x-auto">
      {/* Header */}

      <div className="mb-12">
        <h1 className="text-5xl font-bold text-cyan-400">
          {tournament?.title}
        </h1>

        <p className="text-gray-400 mt-3 text-lg">64 Teams Knockout Bracket</p>
      </div>

      <div className="flex gap-24 items-start min-w-max">
        {/* ==========================
              ROUND 1
        =========================== */}

        <div className="w-72">
          <h2 className="text-center text-cyan-400 text-2xl font-bold mb-8">
            Round 1
          </h2>

          <div className="space-y-8">
            {round1.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        </div>

        {/* ==========================
              ROUND 2
        =========================== */}

        <div className="w-72">
          <h2 className="text-center text-cyan-400 text-2xl font-bold mb-8">
            Round 2
          </h2>

          <div className="space-y-28">
            {round2.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        </div>

        {/* ==========================
              ROUND 3
        =========================== */}

        <div className="w-72">
          <h2 className="text-center text-cyan-400 text-2xl font-bold mb-8">
            Round 3
          </h2>

          <div className="space-y-56">
            {round3.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        </div>

        {/* ==========================
              QUARTER FINALS
        =========================== */}

        <div className="w-72">
          <h2 className="text-center text-cyan-400 text-2xl font-bold mb-8">
            Quarter Finals
          </h2>

          <div className="space-y-[30rem]">
            {quarter.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        </div>
        {/* ==========================
              SEMI FINALS
        =========================== */}

        <div className="w-72">
          <h2 className="text-center text-cyan-400 text-2xl font-bold mb-8">
            Semi Finals
          </h2>

          <div className="space-y-[58rem]">
            {semi.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        </div>

        {/* ==========================
                  FINAL
        =========================== */}

        <div className="w-72 flex flex-col justify-center">
          <h2 className="text-center text-yellow-400 text-2xl font-bold mb-8">
            Final
          </h2>

          {final.length > 0 && <MatchCard match={final[0]} />}

          {/* Champion */}

          {final.length > 0 && final[0].winner && (
            <div
              className="
              mt-12
              rounded-2xl
              border-2
              border-yellow-500
              bg-[#111827]
              p-6
              shadow-[0_0_40px_rgba(255,215,0,.25)]
              text-center
              "
            >
              <div className="text-5xl mb-3">🏆</div>

              <h2 className="text-yellow-400 text-xl font-bold">Champion</h2>

              <h1 className="mt-3 text-3xl font-extrabold text-green-400">
                {final[0].winner.teamName}
              </h1>

              <p className="mt-3 text-gray-400">
                Winner of
                <br />
                {tournament?.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTab;

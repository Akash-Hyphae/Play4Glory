// src/pages/TournamentPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMedal, FaStar } from "react-icons/fa";

const TournamentPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const tournaments = [
    {
      id: 1,
      title: "BGMI Battle Rush 1.0",
      date: "1-Jan to 15-Jan",
      prizepool: "₹10000",
      entry: "₹200",
      mode: "squad",
      rewards: {
        first: "₹5000",
        second: "₹3000",
        third: "₹1000",
        mvp: "₹1000",
      },
      players: "50/64",
      progress: 78,
    },
    {
      id: 2,
      title: "BGMI Warzone Cup",
      date: "2-Jan to 10-Jan",
      prizepool: "₹8000",
      entry: "₹150",
      mode: "duo",
      rewards: {
        first: "₹4000",
        second: "₹2500",
        third: "₹1000",
        mvp: "₹500",
      },
      players: "48/50",
      progress: 96,
    },
    {
      id: 3,
      title: "BGMI Solo Masters",
      date: "5-Jan to 15-Jan",
      prizepool: "₹6000",
      entry: "₹100",
      mode: "solo",
      rewards: {
        first: "₹2500",
        second: "₹2000",
        third: "₹1000",
        mvp: "₹500",
      },
      players: "56/60",
      progress: 93,
    },
    {
      id: 4,
      title: "BGMI Squad Showdown",
      date: "10-Jan to 20-Jan",
      prizepool: "₹12000",
      entry: "₹250",
      mode: "squad",
      rewards: {
        first: "₹6000",
        second: "₹4000",
        third: "₹1500",
        mvp: "₹500",
      },
      players: "59/64",
      progress: 92,
    },
    {
      id: 5,
      title: "BGMI Duo Mayhem",
      date: "15-Jan to 25-Jan",
      prizepool: "₹7000",
      entry: "₹150",
      mode: "duo",
      rewards: {
        first: "₹3000",
        second: "₹2500",
        third: "₹1000",
        mvp: "₹500",
      },
      players: "42/50",
      progress: 84,
    },
    {
      id: 6,
      title: "BGMI Powerplay Cup",
      date: "20-Jan to 30-Jan",
      prizepool: "₹15000",
      entry: "₹300",
      mode: "squad",
      rewards: {
        first: "₹7000",
        second: "₹5000",
        third: "₹2000",
        mvp: "₹1000",
      },
      players: "60/64",
      progress: 94,
    },
    {
      id: 7,
      title: "BGMI Solo Blitz",
      date: "1-Feb to 8-Feb",
      prizepool: "₹5000",
      entry: "₹100",
      mode: "solo",
      rewards: {
        first: "₹2000",
        second: "₹1500",
        third: "₹1000",
        mvp: "₹500",
      },
      players: "58/60",
      progress: 97,
    },
    {
      id: 8,
      title: "BGMI Royal Battle 2.0",
      date: "5-Feb to 15-Feb",
      prizepool: "₹20000",
      entry: "₹400",
      mode: "squad",
      rewards: {
        first: "₹10000",
        second: "₹6000",
        third: "₹3000",
        mvp: "₹1000",
      },
      players: "62/64",
      progress: 97,
    },
    {
      id: 9,
      title: "BGMI Storm Clash",
      date: "10-Feb to 18-Feb",
      prizepool: "₹9000",
      entry: "₹200",
      mode: "duo",
      rewards: {
        first: "₹4000",
        second: "₹3000",
        third: "₹1500",
        mvp: "₹500",
      },
      players: "50/50",
      progress: 100,
    },
    {
      id: 10,
      title: "BGMI Domination League",
      date: "15-Feb to 25-Feb",
      prizepool: "₹25000",
      entry: "₹500",
      mode: "squad",
      rewards: {
        first: "₹12000",
        second: "₹7000",
        third: "₹4000",
        mvp: "₹2000",
      },
      players: "64/64",
      progress: 100,
    },
    {
      id: 11,
      title: "BGMI Duo Thunder",
      date: "1-Mar to 10-Mar",
      prizepool: "₹10000",
      entry: "₹200",
      mode: "duo",
      rewards: {
        first: "₹5000",
        second: "₹3000",
        third: "₹1500",
        mvp: "₹500",
      },
      players: "46/50",
      progress: 92,
    },
    {
      id: 12,
      title: "BGMI Solo Rumble",
      date: "5-Mar to 12-Mar",
      prizepool: "₹6000",
      entry: "₹120",
      mode: "solo",
      rewards: {
        first: "₹2500",
        second: "₹2000",
        third: "₹1000",
        mvp: "₹500",
      },
      players: "57/60",
      progress: 95,
    },
    {
      id: 13,
      title: "BGMI Victory Rush",
      date: "10-Mar to 20-Mar",
      prizepool: "₹18000",
      entry: "₹350",
      mode: "squad",
      rewards: {
        first: "₹9000",
        second: "₹5000",
        third: "₹3000",
        mvp: "₹1000",
      },
      players: "61/64",
      progress: 95,
    },
    {
      id: 14,
      title: "BGMI Duo Fury",
      date: "15-Mar to 25-Mar",
      prizepool: "₹8000",
      entry: "₹150",
      mode: "duo",
      rewards: {
        first: "₹3500",
        second: "₹2500",
        third: "₹1500",
        mvp: "₹500",
      },
      players: "44/50",
      progress: 88,
    },
    {
      id: 15,
      title: "BGMI Elite Arena",
      date: "20-Mar to 30-Mar",
      prizepool: "₹22000",
      entry: "₹400",
      mode: "squad",
      rewards: {
        first: "₹10000",
        second: "₹7000",
        third: "₹4000",
        mvp: "₹1000",
      },
      players: "63/64",
      progress: 98,
    },
    {
      id: 16,
      title: "BGMI Solo Legends",
      date: "1-Apr to 8-Apr",
      prizepool: "₹7000",
      entry: "₹150",
      mode: "solo",
      rewards: {
        first: "₹3000",
        second: "₹2000",
        third: "₹1500",
        mvp: "₹500",
      },
      players: "60/60",
      progress: 100,
    },
    {
      id: 17,
      title: "BGMI Ultimate Scrim",
      date: "5-Apr to 15-Apr",
      prizepool: "₹25000",
      entry: "₹500",
      mode: "squad",
      rewards: {
        first: "₹12000",
        second: "₹7000",
        third: "₹4000",
        mvp: "₹2000",
      },
      players: "64/64",
      progress: 100,
    },
    {
      id: 18,
      title: "BGMI Duo Rampage",
      date: "10-Apr to 20-Apr",
      prizepool: "₹9000",
      entry: "₹200",
      mode: "duo",
      rewards: {
        first: "₹4000",
        second: "₹3000",
        third: "₹1500",
        mvp: "₹500",
      },
      players: "47/50",
      progress: 94,
    },
    {
      id: 19,
      title: "BGMI Battle Bash",
      date: "15-Apr to 25-Apr",
      prizepool: "₹30000",
      entry: "₹600",
      mode: "squad",
      rewards: {
        first: "₹15000",
        second: "₹9000",
        third: "₹5000",
        mvp: "₹1000",
      },
      players: "64/64",
      progress: 100,
    },
    {
      id: 20,
      title: "BGMI Solo Royale",
      date: "20-Apr to 30-Apr",
      prizepool: "₹8000",
      entry: "₹150",
      mode: "solo",
      rewards: {
        first: "₹3500",
        second: "₹2500",
        third: "₹1500",
        mvp: "₹500",
      },
      players: "55/60",
      progress: 91,
    },
    {
      id: 21,
      title: "WarZone Arena: Clash of Squads",
      date: "1-Jan to 15-Jan",
      prizepool: "₹20000",
      entry: "₹400",
      mode: "squad",
      rewards: {
        first: "₹10000",
        second: "₹5000",
        third: "₹3000",
        mvp: "₹2000",
      },
      players: "10/64",
      progress: 15,
    },
  ];

  const filteredTournaments = tournaments.filter(
    (t) =>
      (filter === "all" || t.mode === filter) &&
      t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0e16] text-white px-6 py-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide mb-4 md:mb-0">
          Tournament
        </h1>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 bg-[#121622] border border-cyan-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-48 px-4 py-3 bg-[#121622] border border-cyan-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
        >
          <option value="all">All Types</option>
          <option value="solo">Solo</option>
          <option value="duo">Duo</option>
          <option value="squad">Squad</option>
        </select>
      </div>

      {/* Tournament Cards */}
      <div className="space-y-8">
        {filteredTournaments.map((t) => (
          <div
            key={t.id}
            className="bg-[#10131f] border border-cyan-700 rounded-2xl p-6 shadow-[0_0_20px_#00ffff22] hover:shadow-[0_0_25px_#00ffff55] transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-cyan-300 mb-1">{t.title}</h3>
            <div className="text-sm text-gray-300 mb-4">
              <span className="mr-4 text-cyan-200">Date:</span> {t.date}
              <span className="mx-4 text-cyan-200">| Prizepool:</span>{" "}
              {t.prizepool}
              <span className="mx-4 text-cyan-200">| Entry Fee:</span> {t.entry}
            </div>

            {/* Rewards */}
            <div className="flex flex-wrap gap-4 text-sm mb-4">
              <div className="flex items-center gap-1 text-orange-400">
                <FaMedal /> 1st: {t.rewards.first}
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                <FaMedal className="text-gray-400" /> 2nd: {t.rewards.second}
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <FaMedal className="text-amber-600" /> 3rd: {t.rewards.third}
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <FaStar /> MVP: {t.rewards.mvp}
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-[#1b2033] rounded-full overflow-hidden mb-2">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-cyan-400"
                style={{ width: `${t.progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-400 text-right">{t.players}</div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="flex-1 py-2 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-black transition">
                Register Tournament
              </button>
              <button
                onClick={() => navigate(`/tournament-details/${t.id}`, { state: t })}
                className="flex-1 py-2 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentPage;

// src/components/TournamentSection/TournamentSection.jsx
import React, { useState } from "react";
import TournamentCard from "../TournamentCard";
import TournamentTabs from "../TournamentTabs";
import ScrimCard from "../ScrimCard";

const TournamentSection = () => {
  const [activeTab, setActiveTab] = useState("Tournament");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // ---- same data as before ----
  const scrimSlots = [
    { time: "12:00 - 3:00", maps: ["Erangle", "Miramar", "Rondo"], bg: "/erangle.png" },
    { time: "3:00 - 6:00", maps: ["Erangle", "Miramar", "Rondo"], bg: "/miramar.png" },
    { time: "6:00 - 9:00", maps: ["Erangle", "Miramar", "Rondo"], bg: "/rondo.jpg" },
    { time: "9:00 - 12:00", maps: ["Erangle", "Miramar", "Rondo"], bg: "/erangle.png" },
  ];

  const tournamentDetails = [
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

  const tdmDetails = [
    {
      title: "TDM Warriors: Solo Supremacy",
      prizepool: "₹5000",
      registration: "₹100",
      Date: "1-Jan to 15-Jan",
      type: "Solo",
      first: "₹2500",
      second: "₹1500",
      third: "₹600",
      fourth: "₹400",
      totalSlots: 64,
      filledSlots: 15,
    },
    {
      title: "TDM Rivals: Duo Domination",
      prizepool: "₹5000",
      registration: "₹100",
      Date: "1-Jan to 15-Jan",
      type: "Duo",
      first: "₹2500",
      second: "₹1500",
      third: "₹600",
      fourth: "₹400",
      totalSlots: 64,
      filledSlots: 30,
    },
    {
      title: "TDM Eliminators: Triple Threat",
      prizepool: "₹5000",
      registration: "₹100",
      Date: "1-Jan to 15-Jan",
      type: "Trio",
      first: "₹2500",
      second: "₹1500",
      third: "₹600",
      fourth: "₹400",
      totalSlots: 64,
      filledSlots: 20,
    },
    {
      title: "TDM Arena: Battle of Titans",
      prizepool: "₹5000",
      registration: "₹100",
      Date: "1-Jan to 15-Jan",
      type: "Squad",
      first: "₹2500",
      second: "₹1500",
      third: "₹600",
      fourth: "₹400",
      totalSlots: 64,
      filledSlots: 10,
    },
    {
      title: "TDM Knockout: Road to Glory",
      prizepool: "₹5000",
      registration: "₹100",
      Date: "1-Jan to 15-Jan",
      type: "Squad",
      first: "₹2500",
      second: "₹1500",
      third: "₹600",
      fourth: "₹400",
      totalSlots: 64,
      filledSlots: 45,
    },
  ];

  const getFilteredData = (data) =>
    data.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "All" || item.type === selectedType;
      return matchesSearch && matchesType;
    });

  const renderCards = (data, registerText, isTDM = false) => {
    const filteredData = getFilteredData(data);
    return filteredData.length ? (
      filteredData.map((slot, index) => (
        <TournamentCard
          key={index}
          data={slot}
          registerText={registerText}
          isTDM={isTDM}
        />
      ))
    ) : (
      <p className="text-gray-500 text-center mt-10">No tournaments found.</p>
    );
  };

  return (
    <section className="py-5 px-3 flex gap-3">
      {/* LEFT SECTION */}
      <div className="left bg-[#0D101A] w-[75%] h-[837px] rounded-md px-6 pb-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[#06B6D4]/20 flex flex-col">
        <TournamentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Search + Filter */}
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[70%] p-2 rounded-md bg-[#121622] text-gray-300 border border-[#06B6D4]/30 focus:outline-none focus:border-[#06B6D4] transition-all duration-300"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-[30%] p-2 rounded-md bg-[#121622] text-gray-300 border border-[#06B6D4]/30 focus:outline-none focus:border-[#06B6D4] transition-all duration-300"
          >
            <option value="All">All Types</option>
            <option value="Solo">Solo</option>
            <option value="Duo">Duo</option>
            <option value="Trio">Trio</option>
            <option value="Squad">Squad</option>
          </select>
        </div>

        {/* Cards */}
        <div
          className="overflow-y-auto flex-1 pr-1 custom-scrollbar"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#06B6D4 #1a1c20",
          }}
        >
          {activeTab === "Tournament"
            ? renderCards(tournamentDetails, "Register Tournament")
            : renderCards(tdmDetails, "Register TDM", true)}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right space-y-6 w-[25%]">
        {scrimSlots.map((slot, index) => (
          <ScrimCard key={index} slot={slot} />
        ))}
      </div>
    </section>
  );
};

export default TournamentSection;

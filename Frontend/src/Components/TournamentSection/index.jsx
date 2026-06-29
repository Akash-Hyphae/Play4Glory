import React, { useState } from "react";
import api from "../../Api/axios";
import { useEffect } from "react";
import TournamentCard from "../TournamentCard";
import TournamentTabs from "../TournamentTabs";
import ScrimCard from "../ScrimCard";

const TournamentSection = () => {
  const [activeTab, setActiveTab] = useState("Tournament");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedmode, setSelectedmode] = useState("All");
  const [tournamentDetails, setTournamentDetails] = useState([]);
  const [tdmDetails, setTdmDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---- same data as before ----
  const scrimSlots = [
    {
      time: "12:00 - 3:00",
      maps: ["Erangle", "Miramar", "Rondo"],
      bg: "/erangle.png",
    },
    {
      time: "3:00 - 6:00",
      maps: ["Erangle", "Miramar", "Rondo"],
      bg: "/miramar.png",
    },
    {
      time: "6:00 - 9:00",
      maps: ["Erangle", "Miramar", "Rondo"],
      bg: "/rondo.jpg",
    },
    {
      time: "9:00 - 12:00",
      maps: ["Erangle", "Miramar", "Rondo"],
      bg: "/erangle.png",
    },
  ];

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get("/tournaments");

      const allTournaments = res.data.tournaments;

      setTournamentDetails(
        allTournaments.filter(
          (t) => t.eventType === "tournament"
        )
      );

      setTdmDetails(
        allTournaments.filter(
          (t) => t.eventType === "tdm"
        )
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading) {
  return (
    <div className="text-white text-center mt-10">
      Loading...
    </div>
  );
}

 

  const getFilteredData = (data) =>
  data.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesmode =
      selectedmode === "All" ||
      item.tournamentType?.toLowerCase() ===
        selectedmode.toLowerCase();

    return matchesSearch && matchesmode;
  });

const renderCards = (data, registerText, isTDM = false) => {
  const filteredData = getFilteredData(data);

  return filteredData.length ? (
    filteredData.map((item) => (
      <TournamentCard
        key={item._id}
        data={item}
        registerText={registerText}
        isTDM={isTDM}
      />
    ))
  ) : (
    <p className="text-gray-500 text-center mt-10">
      No tournaments found.
    </p>
  );
};

 

  return (
    <section className="py-5 px-3 flex gap-3">
      {/* LEFT SECTION */}
      <div className="left bg-[#0D101A] w-[75%] h-[837px] rounded-md px-6 pb-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[#06B6D4]/20 flex flex-col">
        {/* Tabs */}
        <TournamentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Search & Filter */}
        <div className="flex gap-3 mb-3">
          <input
            mode="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[70%] p-2 rounded-md bg-[#121622] text-gray-300 border border-[#06B6D4]/30 focus:outline-none focus:border-[#06B6D4] transition-all duration-300"
          />
          <select
            value={selectedmode}
            onChange={(e) => setSelectedmode(e.target.value)}
            className="w-[30%] p-2 rounded-md bg-[#121622] text-gray-300 border border-[#06B6D4]/30 focus:outline-none focus:border-[#06B6D4] transition-all duration-300"
          >
            <option value="All">All modes</option>
            <option value="solo">Solo</option>
            <option value="duo">Duo</option>
            <option value="squad">Squad</option>
          </select>
        </div>

        {/* Cards */}
        <div
          className="overflow-y-auto flex-1 pr-1 custom-scrollbar"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#06B6D4 #1a1c20" }}
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

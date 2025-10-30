// src/components/TournamentSection/TournamentTabs.jsx
import React from "react";
import Button from "@mui/material/Button";

const TournamentTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="button flex text-white mb-4">
      <Button
        onClick={() => setActiveTab("Tournament")}
        sx={{
          width: "50%",
          textTransform: "capitalize",
          fontSize: "24px",
          color: "#fff",
          borderBottom:
            activeTab === "Tournament" ? "4px solid #06B6D4" : "",
          borderRadius: 0,
          transition: "all 0.3s ease",
          fontFamily: "Orbitron, sans-serif",
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        Tournament
      </Button>
      <Button
        onClick={() => setActiveTab("TDM Knockout")}
        sx={{
          width: "50%",
          textTransform: "capitalize",
          fontSize: "24px",
          color: "#fff",
          borderBottom:
            activeTab === "TDM Knockout" ? "4px solid #06B6D4" : "",
          borderRadius: 0,
          transition: "all 0.3s ease",
          fontFamily: "Orbitron, sans-serif",
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        TDM Knockout
      </Button>
    </div>
  );
};

export default TournamentTabs;

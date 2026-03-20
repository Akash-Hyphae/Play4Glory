import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import OverviewTab from "./overviewTab";
import ScheduleTab from "./ScheduleTab";
import LeaderboardTab from "./LeaderboardTab";
import LiveTab from "./LiveTab";
import RewardsTab from "./RewardsTab";
import TeamTab from "./TeamTab";

const TdmDetailPage = () => {
  const { id } = useParams();
  const [section, setSection] = useState("overview");

  // ✅ Sample Data (FIXED: added image + status)
  const tdms = [
    {
      id: 1,
      title: "BGMI TDM Knockout 1.0",
      date: "1-Jan to 5-Jan",
      prizepool: "₹5000",
      entry: "₹100",
      mode: "squad",
      status: "Ongoing",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      rewards: {
        first: "₹2000",
        second: "₹1500",
        third: "₹1000",
        fourth: "₹500",
      },
      players: "50/64",
    },
    {
      id: 2,
      title: "BGMI TDM Solo Blitz",
      date: "10-Jan to 15-Jan",
      prizepool: "₹4000",
      entry: "₹80",
      mode: "solo",
      status: "Upcoming",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420",
      rewards: {
        first: "₹1500",
        second: "₹1200",
        third: "₹800",
        fourth: "₹500",
      },
      players: "58/60",
    },
    {
      id: 3,
      title: "BGMI TDM Duo Domination",
      date: "20-Jan to 25-Jan",
      prizepool: "₹6000",
      entry: "₹120",
      mode: "duo",
      status: "Ongoing",
      image:
        "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      rewards: {
        first: "₹2500",
        second: "₹2000",
        third: "₹1000",
        fourth: "₹500",
      },
      players: "48/50",
    },
    {
      id: 4,
      title: "BGMI TDM Power Clash",
      date: "25-Jan to 30-Jan",
      prizepool: "₹10000",
      entry: "₹200",
      mode: "squad",
      status: "Completed",
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
      rewards: {
        first: "₹4000",
        second: "₹3000",
        third: "₹2000",
        fourth: "₹1000",
      },
      players: "64/64",
    },
  ];

  const tdm = tdms.find((t) => t.id === parseInt(id));

  // ✅ NOT FOUND
  if (!tdm) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          background: "linear-gradient(180deg, #0B0E16 0%, #10131F 100%)",
        }}
      >
        <Typography variant="h6">TDM Knockout not found 😢</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0B0E16 0%, #10131F 100%)",
        color: "#fff",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          position: "relative",
          height: 300,
          backgroundImage: `url(${tdm.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          p: 3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, #0B0E16 100%)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {tdm.title}
          </Typography>

          <Typography variant="body2" color="gray">
            {tdm.date}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Chip
              label={tdm.status}
              size="small"
              sx={{
                backgroundColor:
                  tdm.status === "Ongoing"
                    ? "#0EA5E9"
                    : tdm.status === "Completed"
                    ? "#22C55E"
                    : "#DC2626",
                color: "#fff",
              }}
            />

            <Chip
              label={tdm.mode}
              size="small"
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
              }}
            />

            <Chip
              label={`Prizepool ${tdm.prizepool}`}
              size="small"
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* REGISTER BUTTON */}
      <Box sx={{ textAlign: "right", p: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#06B6D4",
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#0891b2" },
          }}
        >
          Register Now
        </Button>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* TABS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          py: 2,
        }}
      >
        {[
          { key: "overview", label: "Overview" },
          { key: "schedule", label: "Schedule" },
          { key: "live", label: "Live" },
          { key: "leaderboard", label: "Leaderboard" },
          { key: "rewards", label: "Rewards" },
          { key: "teams", label: "Teams" },
        ].map((tab) => (
          <Button
            key={tab.key}
            onClick={() => setSection(tab.key)}
            sx={{
              color:
                section === tab.key ? "#06B6D4" : "rgba(255,255,255,0.7)",
              borderBottom:
                section === tab.key
                  ? "2px solid #06B6D4"
                  : "2px solid transparent",
              borderRadius: 0,
              pb: 1,
              fontWeight: section === tab.key ? 700 : 500,
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* CONTENT */}
      <Box sx={{ p: 4, maxWidth: "1250px", mx: "auto" }}>
        <Card
          sx={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            color: "#fff",
            p: 3,
          }}
        >
          <CardContent>
            {section === "overview" && <OverviewTab tdm={tdm} />}
            {section === "schedule" && <ScheduleTab tdm={tdm} />}
            {section === "live" && <LiveTab />}
            {section === "leaderboard" && <LeaderboardTab />}
            {section === "rewards" && <RewardsTab tdm={tdm} />}
            {section === "teams" && <TeamTab />}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TdmDetailPage;
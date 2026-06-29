import React, { useState, useEffect } from "react";
import api from "../../Api/axios";
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
  const [tdm, setTdm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await api.get(`/tournaments/${id}`);

        setTdm(res.data.tournament);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        Loading...
      </Box>
    );
  }

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
          backgroundImage:
            "url(https://images.unsplash.com/photo-1542751371-adc38448a05e)",
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
            {new Date(tdm.startTime).toLocaleDateString()}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Chip
              label={tdm.status}
              size="small"
              sx={{
                backgroundColor:
                  tdm.status === "live"
                    ? "#0EA5E9"
                    : tdm.status === "completed"
                      ? "#22C55E"
                      : "#DC2626",
              }}
            />

            <Chip
              label={tdm.tournamentType}
              size="small"
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
              }}
            />

            <Chip
              label={`Prizepool ${`₹${tdm.entryFee * tdm.maxSlots * 0.8}`}`}
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
              color: section === tab.key ? "#06B6D4" : "rgba(255,255,255,0.7)",
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
            {section === "schedule" && <ScheduleTab tournamentId={id} />}
            {section === "live" && <LiveTab tournamentId={id} />}
            {section === "leaderboard" && <LeaderboardTab tournamentId={id} />}
            {section === "rewards" && <RewardsTab tdm={tdm} />}
            {section === "teams" && <TeamTab tournamentId={id} />}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TdmDetailPage;

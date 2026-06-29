import React, { useState } from "react";
import { Box, Typography, Button, Card, Chip, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import OverviewTab from "./overviewTab";
import ScheduleTab from "./scheduleTab";
import LiveTab from "./liveTab";
import LeaderBoardTab from "./leaderboardTab";
import MVPTable from "./mvpTab";
import TeamsTab from "./teamsTab";
import { useEffect } from "react";
import api from "../../Api/axios";

const TournamentDetailPage = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [calculations, setCalculations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("overview");

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await api.get(`/tournaments/${id}`);

        setTournament(res.data.tournament);
        setCalculations(res.data.calculations);
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
  if (!tournament) {
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
        Tournament Not Found
      </Box>
    );
  }

  const handleSectionChange = (value) => setSection(value);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0B0E16 0%, #10131F 100%)",
        color: "#fff",
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "320px",
          backgroundImage: `url(${tournament.bannerImage || "/bgmi-banner.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottom: "2px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          p: 4,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(11,14,22,0.95) 100%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 20px rgba(0,0,0,0.6)",
              border: "2px solid rgba(255,255,255,0.15)",
            }}
          >
            <img
              src={tournament.bannerImage || "/bgmi-banner.jpg"}
              alt={tournament.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: "Orbitron, sans-serif",
                mb: 1,
              }}
            >
              {tournament.title}
            </Typography>

            <Typography sx={{ color: "gray.400", mb: 1 }}>
              {new Date(tournament.startTime).toLocaleDateString()}
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Chip
                label={tournament.status}
                size="small"
                sx={{
                  backgroundColor:
                    tournament.status === "Ended" ? "#DC2626" : "#0EA5E9",
                  color: "#fff",
                }}
              />
              <Chip
                label={tournament.tournamentType}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              />
              <Chip
                label={`Prizepool ₹${calculations?.prizePool || 0}`}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              />
              <Chip
                label={tournament.game}
                size="small"
                sx={{
                  backgroundColor: "#06B6D4",
                  color: "#fff",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ACTION BUTTON */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 3,
          pr: 6,
        }}
      >
        {tournament.status === "completed" ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgba(255,255,255,0.08)",
              textTransform: "none",
              borderRadius: "10px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            Tournament Ended
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#06B6D4",
              textTransform: "none",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#0891b2",
              },
            }}
          >
            Register Now
          </Button>
        )}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* NAV TABS */}
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
          { key: "Leaderboard", label: "Leaderboard" },
          { key: "MVP Leaderboard", label: "MVP Leaderboard" },
          { key: "teams", label: "Teams" },
        ].map((item) => (
          <Button
            key={item.key}
            onClick={() => handleSectionChange(item.key)}
            sx={{
              color: section === item.key ? "#06B6D4" : "rgba(255,255,255,0.7)",
              textTransform: "none",
              fontWeight: section === item.key ? 700 : 500,
              fontSize: "16px",
              borderBottom:
                section === item.key
                  ? "2px solid #06B6D4"
                  : "2px solid transparent",
              borderRadius: 0,
              pb: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#06B6D4",
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* CONTENT */}
      <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
        <Card
          sx={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            backdropFilter: "blur(6px)",
            color: "#fff",
            p: 3,
          }}
        >
          {/* OVERVIEW */}
          {section === "overview" && (
            <OverviewTab tournament={tournament} calculations={calculations} />
          )}
          {/* SCHEDULE */}
          {section === "schedule" && <ScheduleTab tournament={tournament} />}

          {/* LIVE */}
          {section === "live" && <LiveTab tournament={tournament} />}

          {/* LEADERBOARD */}
          {section === "Leaderboard" && (
            <LeaderBoardTab tournament={tournament} />
          )}

          {/* MVP LEADERBOARD */}
          {section === "MVP Leaderboard" && (
            <MVPTable tournament={tournament} />
          )}

          {/* TEAMS */}
          {section === "teams" && <TeamsTab tournament={tournament} />}
        </Card>
      </Box>
    </Box>
  );
};

export default TournamentDetailPage;

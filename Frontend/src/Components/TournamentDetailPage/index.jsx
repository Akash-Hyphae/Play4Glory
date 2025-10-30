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

const TournamentDetailPage = () => {
  const { id } = useParams();
  const [section, setSection] = useState("overview");

  // 👇 Use same tournament list as in TournamentPage
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
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
      image:
        "https://cdn.pixabay.com/photo/2021/04/14/14/39/warzone-6175674_1280.jpg",
      status: "Ended",
      game: "BGMI",
    },
  ];

  // 👇 Find selected tournament
  const tournament = tournaments.find(
    (t) => t.id === parseInt(id)
  );

  if (!tournament) {
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
        <Typography variant="h6">Tournament not found 😢</Typography>
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
          backgroundImage: `url(${tournament.image})`,
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
              src={tournament.image}
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
              {tournament.date}
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
                label={tournament.mode}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              />
              <Chip
                label={`Prizepool ${tournament.prizepool}`}
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
        {tournament.status === "Ended" ? (
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
              color:
                section === item.key ? "#06B6D4" : "rgba(255,255,255,0.7)",
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
      <Box sx={{ p: 4, maxWidth: "1000px", mx: "auto" }}>
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
          <CardContent>
            {section === "overview" && (
              <Typography>
                🏆 {tournament.title} is a thrilling {tournament.mode}-mode
                event with a prizepool of {tournament.prizepool}. Entry fee:{" "}
                {tournament.entry}.
              </Typography>
            )}
            {section === "schedule" && (
              <Typography>🕒 Schedule details here...</Typography>
            )}
            {section === "live" && (
              <Typography>📺 Live stream info goes here...</Typography>
            )}
            {section === "Leaderboard" && (
              <Typography>🔐 Room Leaderboard here...</Typography>
            )}
            {section === "MVP Leaderboard" && (
              <Typography>🥇 MVP Leaderboard leaderboard here...</Typography>
            )}
            {section === "teams" && (
              <Typography>👥 Teams and player list here...</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TournamentDetailPage;

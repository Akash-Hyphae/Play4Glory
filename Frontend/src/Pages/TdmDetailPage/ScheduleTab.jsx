import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function ScheduleTab({ tournamentId }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get(`/tdm-match/${tournamentId}`);
        setMatches(res.data.matches);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [tournamentId]);

  if (loading) {
    return (
      <Typography color="white">
        Loading Matches...
      </Typography>
    );
  }

  const groupedMatches = {};

  matches.forEach((match) => {
    if (!groupedMatches[match.round]) {
      groupedMatches[match.round] = [];
    }

    groupedMatches[match.round].push(match);
  });

  return (
    <Box sx={{ display: "flex", gap: 6, overflowX: "auto", p: 2 }}>
      {Object.entries(groupedMatches).map(
        ([roundName, roundMatches]) => (
          <Box key={roundName}>
            <Typography sx={{ mb: 2, color: "#00e5ff" }}>
              {roundName}
            </Typography>

            {roundMatches.map((match) => (
              <Card
                key={match._id}
                sx={{
                  mb: 4,
                  width: 220,
                  background: "#0f172a",
                  color: "white",
                  border: "1px solid #1e293b",
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  {/* Team A */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography>
                      {match.teamA?.teamName || "TBD"}
                    </Typography>
                  </Box>

                  {/* Team B */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography>
                      {match.teamB?.teamName || "TBD"}
                    </Typography>
                  </Box>

                  {/* Winner */}
                  {match.winner && (
                    <Typography
                      mt={1}
                      color="#22c55e"
                      fontWeight="bold"
                    >
                      🏆 {match.winner.teamName}
                    </Typography>
                  )}

                  {/* Status */}
                  <Typography
                    mt={1}
                    color={
                      match.status === "completed"
                        ? "#22c55e"
                        : match.status === "live"
                        ? "#06B6D4"
                        : "#facc15"
                    }
                  >
                    {match.status.toUpperCase()}
                  </Typography>

                  {/* Match Time */}
                  {match.matchTime && (
                    <Typography
                      mt={1}
                      fontSize="13px"
                      color="#94a3b8"
                    >
                      {new Date(
                        match.matchTime
                      ).toLocaleString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )
      )}
    </Box>
  );
}
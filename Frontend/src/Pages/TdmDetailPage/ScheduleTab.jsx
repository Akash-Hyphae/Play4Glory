import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const isAdmin = true;

// 👉 Generate 64 teams automatically
const generateTeams = () => {
  return Array.from({ length: 64 }, (_, i) => `Team ${i + 1}`);
};

const roundNames = [
  "Round 1",
  "Round 2",
  "Round 3",
  "Quarter Final",
  "Semi Final",
  "Final",
];

// 👉 Convert teams → Round 1 matches (32 matches)
const createInitialRounds = () => {
  const teams = generateTeams();
  const round1 = [];

  for (let i = 0; i < teams.length; i += 2) {
    round1.push({
      team1: teams[i],
      team2: teams[i + 1],
      winner: "",
    });
  }

  return [
    round1, // 32 matches
    [], // 16 matches
    [], // 8
    [], // 4
    [], // 2
    [], // Final
  ];
};

export default function ScheduleTab() {
  const [rounds, setRounds] = useState(createInitialRounds());

  const selectWinner = (roundIndex, matchIndex, winner) => {
    setRounds((prev) => {
      const updated = [...prev];

      // Prevent overwrite
      if (updated[roundIndex][matchIndex].winner) return prev;

      updated[roundIndex][matchIndex].winner = winner;

      const nextRoundIndex = roundIndex + 1;

      const nextMatchIndex = Math.floor(matchIndex / 2);

      if (!updated[nextRoundIndex][nextMatchIndex]) {
        updated[nextRoundIndex][nextMatchIndex] = {
          team1: "",
          team2: "",
          winner: "",
        };
      }

      if (matchIndex % 2 === 0) {
        updated[nextRoundIndex][nextMatchIndex].team1 = winner;
      } else {
        updated[nextRoundIndex][nextMatchIndex].team2 = winner;
      }

      return [...updated];
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 6, overflowX: "auto", p: 2 }}>
      {rounds.map((round, roundIndex) => (
        <Box key={roundIndex}>
          <Typography sx={{ mb: 2, color: "#00e5ff" }}>
            {roundNames[roundIndex] || `Round ${roundIndex + 1}`}
          </Typography>

          {round.map((match, matchIndex) => (
            <Card
              key={matchIndex}
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
                {/* Team 1 */}
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>{match.team1 || "TBD"}</Typography>

                  {isAdmin && match.team1 && !match.winner && (
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#22c55e",
                        color: "#000",
                        "&:hover": { backgroundColor: "#16a34a" },
                      }}
                      onClick={() =>
                        selectWinner(roundIndex, matchIndex, match.team1)
                      }
                    >
                      Win
                    </Button>
                  )}
                </Box>

                {/* Team 2 */}
                <Box display="flex" justifyContent="space-between">
                  <Typography>{match.team2 || "TBD"}</Typography>

                  {isAdmin && match.team2 && !match.winner && (
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#22c55e",
                        color: "#000",
                        "&:hover": { backgroundColor: "#16a34a" },
                      }}
                      onClick={() =>
                        selectWinner(roundIndex, matchIndex, match.team2)
                      }
                    >
                      Win
                    </Button>
                  )}
                </Box>

                {/* Winner */}
                {match.winner && (
                  <Typography mt={1} color="#22c55e" fontWeight="bold">
                    🏆 {match.winner}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  );
}

import React from "react";
import { Box, Typography } from "@mui/material";

const RewardsTab = ({ tdm }) => {
  if (!tdm) return null;

  const prizePool = Math.floor((tdm.entryFee || 0) * (tdm.maxSlots || 0) * 0.8);
  const rewards = {
    first: Math.floor(prizePool * 0.4),
    second: Math.floor(prizePool * 0.3),
    third: Math.floor(prizePool * 0.2),
    fourth: Math.floor(prizePool * 0.1),
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#06B6D4" }}>
        💰 Rewards Breakdown (Pool: ₹{prizePool})
      </Typography>
      <Typography sx={{ mb: 1 }}>🥇 1st Position — ₹{rewards.first}</Typography>
      <Typography sx={{ mb: 1 }}>🥈 2nd Position — ₹{rewards.second}</Typography>
      <Typography sx={{ mb: 1 }}>🥉 3rd Position — ₹{rewards.third}</Typography>
      <Typography sx={{ mb: 1 }}>🏅 4th Position — ₹{rewards.fourth}</Typography>
    </Box>
  );
};

export default RewardsTab;
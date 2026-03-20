import { Box, Typography } from "@mui/material";

const RewardsTab = ({ tdm }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        💰 Rewards Breakdown
      </Typography>
      <Typography>🥇 1st Position — {tdm.rewards.first}</Typography>
      <Typography>🥈 2nd Position — {tdm.rewards.second}</Typography>
      <Typography>🥉 3rd Position — {tdm.rewards.third}</Typography>
      <Typography>🏅 4th Position — {tdm.rewards.fourth}</Typography>
    </Box>
  );
};

export default RewardsTab;
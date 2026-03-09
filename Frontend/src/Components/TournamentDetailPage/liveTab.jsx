import { Box, Typography, Divider } from "@mui/material";

const LiveTab = ({tournament}) => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Live Stream
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "300px",
          borderRadius: "12px",
          background: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "gray" }}>
          Live stream will appear here 🎥
        </Typography>
      </Box>
    </Box>
  );
};

export default LiveTab;
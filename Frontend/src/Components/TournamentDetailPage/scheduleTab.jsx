import { Box, Typography, Card } from "@mui/material";

const matches = [
  { map: "Rondo", time: "6:00 PM" },
  { map: "Erangel", time: "7:00 PM" },
  { map: "Erangel", time: "7:45 PM" },
  { map: "Erangel", time: "8:30 PM" },
  { map: "Miramar", time: "9:15 PM" },
  { map: "Miramar", time: "10:00 PM" },
];

const mapColors = {
  Erangel: "#00e5ff",
  Miramar: "#ff9100",
  Sanhok: "#69f0ae",
  Rondo: "#ff4081",
};

const ScheduleTab = () => {
  return (
    <Box>

      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: 700,
          mb: 3,
          color: "#fff",
        }}
      >
        Match Schedule
      </Typography>

      {matches.map((match, i) => (
        <Card
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            p: 2,
            borderRadius: "14px",
            background: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            transition: "0.3s",
            "&:hover": {
              border: "1px solid #00e5ff",
              transform: "translateY(-2px)",
            },
          }}
        >

          {/* Match Number Circle */}
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#020617",
              border: "2px solid #00e5ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "#00e5ff",
              mr: 2,
            }}
          >
            {i + 1}
          </Box>

          {/* Match Info */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              Match {i + 1} • {match.map}
            </Typography>

            <Typography sx={{ color: "#9ca3af", fontSize: "14px" }}>
              Start Time: {match.time}
            </Typography>
          </Box>

          {/* Map Badge */}
          <Box
            sx={{
              px: 2,
              py: "4px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              background: mapColors[match.map],
              color: "#000",
            }}
          >
            {match.map}
          </Box>

        </Card>
      ))}

    </Box>
  );
};

export default ScheduleTab;
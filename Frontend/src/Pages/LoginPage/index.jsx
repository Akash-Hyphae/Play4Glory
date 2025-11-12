import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // handle auth here
    console.log("login", { email, password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 3,
        py: 6,
        background: "linear-gradient(180deg,#0B0F1A 0%,#07090c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Orbitron, sans-serif",
      }}
    >
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          width: { xs: "92%", sm: 700 },
          bgcolor: "rgba(10,13,20,0.7)",
          borderRadius: "18px",
          border: "1px solid rgba(6,182,212,0.12)",
          boxShadow: "0 8px 40px rgba(6,182,212,0.06)",
          p: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography sx={{ color: "#06B6D4", fontSize: 28, fontWeight: 800 }}>
            Welcome Back
          </Typography>
          <IconButton
            size="small"
            onClick={() => console.log("close (optional)")}
            sx={{
              color: "#06B6D4",
              border: "1px solid rgba(6,182,212,0.15)",
              "&:hover": { background: "rgba(6,182,212,0.06)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* subtitle */}
        <Typography sx={{ color: "rgba(255,255,255,0.75)", mb: 3 }}>
          Sign in to access tournaments, scrims and live events.
        </Typography>

        {/* inputs */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="filled"
            InputLabelProps={{ style: { color: "#9ca3af" } }}
            InputProps={{
              disableUnderline: true,
              sx: {
                background: "#0f1720",
                color: "white",
                borderRadius: "10px",
                px: 1.5,
                py: 0.6,
                "& .MuiFilledInput-input": { padding: "14px 8px" },
              },
            }}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
            variant="filled"
            InputLabelProps={{ style: { color: "#9ca3af" } }}
            InputProps={{
              disableUnderline: true,
              sx: {
                background: "#0f1720",
                color: "white",
                borderRadius: "10px",
                px: 1.5,
                py: 0.6,
                "& .MuiFilledInput-input": { padding: "14px 8px" },
              },
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                background: "#06B6D4",
                color: "#001219",
                fontWeight: 700,
                px: 4,
                py: 1.1,
                borderRadius: "10px",
                "&:hover": { background: "#0891b2" },
                boxShadow: "0 8px 28px rgba(6,182,212,0.12)",
              }}
            >
              Sign In
            </Button>

            <Button
              onClick={() => navigate("/signup")}
              variant="outlined"
              sx={{
                color: "#06B6D4",
                borderColor: "rgba(6,182,212,0.12)",
                textTransform: "none",
              }}
            >
              Create account
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.04)" }} />

        <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
          Or sign in with
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button sx={{ flex: 1, color: "#fff", background: "#1f2937", "&:hover": { background: "#111827" } }}>
            Google
          </Button>
          <Button sx={{ flex: 1, color: "#fff", background: "#1f2937", "&:hover": { background: "#111827" } }}>
            Phone no.
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

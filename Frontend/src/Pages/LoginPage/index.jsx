import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../Api/axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("playerToken");

    if (token) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("playerToken", res.data.token);

      localStorage.setItem(
        "playerName",
        res.data.user.displayName
      );

      navigate("/profile", { replace: true });
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Login Failed");
    }
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: "#06B6D4",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            Welcome Back
          </Typography>

          <IconButton
            size="small"
            sx={{
              color: "#06B6D4",
              border: "1px solid rgba(6,182,212,0.15)",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.75)",
            mb: 3,
          }}
        >
          Sign in to access tournaments, scrims and live events.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="filled"
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="filled"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              type="submit"
            >
              Sign In
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/signup")}
            >
              Create account
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography
          sx={{
            color: "rgba(255,255,255,.6)",
          }}
        >
          Or sign in with
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            sx={{
              flex: 1,
              color: "#fff",
              background: "#1f2937",
            }}
          >
            Google
          </Button>

          <Button
            sx={{
              flex: 1,
              color: "#fff",
              background: "#1f2937",
            }}
          >
            Phone no.
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
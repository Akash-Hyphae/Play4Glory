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
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("playerToken");
    if (token) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const redirectToAdmin = (token, user) => {
    const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";
    // AdminPanel uses "token" and "user" in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = adminUrl;
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // Check if user is an admin or clicked "Login as Admin"
      if (user?.role === "admin") {
        redirectToAdmin(token, user);
        return;
      }

      // If they explicitly toggled admin mode but the account is a player
      if (isAdminMode && user?.role !== "admin") {
        alert("Access Denied: This account does not have admin permissions.");
        return;
      }

      // Standard Player login
      localStorage.setItem("playerToken", token);
      localStorage.setItem("playerName", user.displayName);
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
          border: isAdminMode
            ? "1px solid #06B6D4"
            : "1px solid rgba(6,182,212,0.12)",
          boxShadow: isAdminMode
            ? "0 0 30px rgba(6,182,212,0.25)"
            : "0 8px 40px rgba(6,182,212,0.06)",
          p: 4,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
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
            {isAdminMode ? "Admin Portal Login" : "Welcome Back"}
          </Typography>

          <IconButton
            size="small"
            onClick={() => navigate("/")}
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
          {isAdminMode
            ? "Sign in with your administrator credentials to open the management panel."
            : "Sign in to access tournaments, scrims and live events."}
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
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
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
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
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                background: "#06B6D4",
                color: "#001219",
                fontWeight: 700,
                px: 4,
                py: 1.2,
                borderRadius: "10px",
                "&:hover": { background: "#0891b2" },
              }}
            >
              {isAdminMode ? "Login as Admin" : "Sign In"}
            </Button>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="outlined"
                onClick={() => setIsAdminMode(!isAdminMode)}
                sx={{
                  borderColor: "#06B6D4",
                  color: "#06B6D4",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "10px",
                  "&:hover": {
                    borderColor: "#22D3EE",
                    backgroundColor: "rgba(6,182,212,0.1)",
                  },
                }}
              >
                {isAdminMode ? "Switch to Player Login" : "Login as Admin"}
              </Button>

              {!isAdminMode && (
                <Button
                  variant="outlined"
                  onClick={() => navigate("/signup")}
                  sx={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.8)",
                    textTransform: "none",
                    borderRadius: "10px",
                    "&:hover": {
                      borderColor: "#06B6D4",
                      color: "#06B6D4",
                    },
                  }}
                >
                  Create account
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <Typography
          sx={{
            color: "rgba(255,255,255,.6)",
            textAlign: "center",
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
              borderRadius: "10px",
              "&:hover": { background: "#374151" },
            }}
          >
            Google
          </Button>

          <Button
            sx={{
              flex: 1,
              color: "#fff",
              background: "#1f2937",
              borderRadius: "10px",
              "&:hover": { background: "#374151" },
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
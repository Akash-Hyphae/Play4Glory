import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../../../Api/axios";
import { useEffect } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("playerToken");

  if (token) {
    navigate("/profile", { replace: true });
  }
}, [navigate]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    ign: "",
    igid: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (k) => (e) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/users/register", {
        displayName: form.name,
        email: form.email,
        password: form.password,
        inGameName: form.ign,
        inGameId: form.igid,
      });

      alert("Account Created Successfully");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
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
          width: { xs: "94%", sm: 840 },
          bgcolor: "rgba(10,13,20,0.75)",
          borderRadius: "18px",
          border: "1px solid rgba(6,182,212,0.12)",
          boxShadow: "0 8px 40px rgba(6,182,212,0.06)",
          p: 5,
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ color: "#06B6D4", fontSize: 26, fontWeight: 800 }}>
            Create Account
          </Typography>
          <IconButton
            onClick={() => console.log("close")}
            sx={{ color: "#06B6D4" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography sx={{ color: "rgba(255,255,255,0.75)", mb: 3 }}>
          Join to register for tournaments, scrims and watch live events.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            label="Display name"
            value={form.name}
            onChange={handleChange("name")}
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
              },
            }}
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange("email")}
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
              },
            }}
          />
          <TextField
            label="Password"
            value={form.password}
            onChange={handleChange("password")}
            type={showPassword ? "text" : "password"}
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
              },

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#9ca3af" }} />
                    ) : (
                      <Visibility sx={{ color: "#9ca3af" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            value={form.confirm}
            onChange={handleChange("confirm")}
            type={showConfirm ? "text" : "password"}
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
              },

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirm(!showConfirm)}
                    edge="end"
                  >
                    {showConfirm ? (
                      <VisibilityOff sx={{ color: "#9ca3af" }} />
                    ) : (
                      <Visibility sx={{ color: "#9ca3af" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="In Game Name"
            value={form.ign}
            onChange={handleChange("ign")}
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
              },
            }}
          />
          <TextField
            label="In Game ID"
            value={form.igid}
            onChange={handleChange("igid")}
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
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              background: "#06B6D4",
              color: "#001219",
              fontWeight: 800,
              px: 4,
              py: 1.1,
              borderRadius: "10px",
              "&:hover": { background: "#0891b2" },
            }}
          >
            Create Account
          </Button>

          <Button
            onClick={() => navigate("/login")}
            variant="outlined"
            sx={{ color: "#06B6D4" }}
          >
            Already have an account?
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;

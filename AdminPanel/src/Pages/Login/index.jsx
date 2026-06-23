import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../Api/axios";

const fieldStyle = {
  mb: 3,

  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "#141827",
    borderRadius: "12px",

    "& fieldset": {
      borderColor: "#555",
    },

    "&:hover fieldset": {
      borderColor: "#06B6D4",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#06B6D4",
      boxShadow: "0 0 10px #06B6D4",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#aaa",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#06B6D4",
  },
};

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post(
        "/users/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0B0F1A 0%, #10131F 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "450px",
          p: 5,
          background:
            "linear-gradient(180deg, #0B0F1A 0%, #10131F 100%)",
          border: "1px solid #06B6D4",
          borderRadius: "20px",
          boxShadow:
            "0 0 30px rgba(6,182,212,0.3)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            textAlign: "center",
            mb: 4,
            fontWeight: 700,
          }}
        >
          Admin Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={fieldStyle}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          sx={fieldStyle}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: "bold",
            background: "#06B6D4",
            color: "black",

            "&:hover": {
              background: "#0891b2",
            },
          }}
        >
          LOGIN
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import api from "../../Api/axios";

const fieldStyle = {
  width: "48%",
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "#141827",
    borderRadius: "12px",
    height: "56px",

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

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    game: "",
    tournamentType: "",
    entryFee: "",
    maxSlots: "",
    startTime: "",
    bannerImage: "",
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
        "/tournaments",
        formData
      );

      alert("Tournament Created Successfully");

      console.log(res.data);

      setFormData({
        title: "",
        eventType: "",
        game: "",
        tournamentType: "",
        entryFee: "",
        maxSlots: "",
        startTime: "",
        bannerImage: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 6,
        px: 2,
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: "1100px",
          color: "white",
          background:
            "linear-gradient(180deg, #0B0F1A 0%, #10131F 100%)",
          borderRadius: "20px",
          border: "1px solid #06B6D4",
          boxShadow: "0 0 30px rgba(6,182,212,0.3)",
        }}
      >
        <Typography variant="h5" mb={4}>
          Create Tournament
        </Typography>

        {/* TITLE */}
        <TextField
          label="Tournament Title"
          name="title"
          fullWidth
          value={formData.title}
          sx={{ ...fieldStyle, width: "100%", mb: 3 }}
          onChange={handleChange}
        />

        {/* EVENT TYPE + GAME */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <TextField
            select
            label="Event Type"
            name="eventType"
            value={formData.eventType}
            sx={fieldStyle}
            onChange={handleChange}
          >
            <MenuItem value="tournament">
              Tournament
            </MenuItem>

            <MenuItem value="scrim">
              Scrim
            </MenuItem>

            <MenuItem value="tdm">
              TDM
            </MenuItem>
          </TextField>

          <TextField
            select
            label="Game"
            name="game"
            value={formData.game}
            sx={fieldStyle}
            onChange={handleChange}
          >
            <MenuItem value="BGMI">
              BGMI
            </MenuItem>

            <MenuItem value="Free Fire">
              Free Fire
            </MenuItem>

            <MenuItem value="COD Mobile">
              COD Mobile
            </MenuItem>
          </TextField>
        </Box>

        {/* TOURNAMENT TYPE + ENTRY FEE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <TextField
            select
            label="Tournament Type"
            name="tournamentType"
            value={formData.tournamentType}
            sx={fieldStyle}
            onChange={handleChange}
          >
            <MenuItem value="Solo">
              Solo
            </MenuItem>

            <MenuItem value="Duo">
              Duo
            </MenuItem>

            <MenuItem value="Squad">
              Squad
            </MenuItem>
          </TextField>

          <TextField
            label="Entry Fee"
            name="entryFee"
            type="number"
            value={formData.entryFee}
            sx={fieldStyle}
            onChange={handleChange}
          />
        </Box>

        {/* MAX SLOTS + START TIME */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <TextField
            label="Max Slots"
            name="maxSlots"
            type="number"
            value={formData.maxSlots}
            sx={fieldStyle}
            onChange={handleChange}
          />

          <TextField
            label="Tournament Start Time"
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            sx={fieldStyle}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </Box>

        {/* BANNER IMAGE */}
        <TextField
          label="Banner Image URL"
          name="bannerImage"
          fullWidth
          value={formData.bannerImage}
          sx={{
            ...fieldStyle,
            width: "100%",
            mb: 3,
          }}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background: "#06B6D4",
              color: "black",
              fontWeight: "bold",
              px: 6,
              py: 1.5,
              borderRadius: "12px",
              fontSize: "14px",

              "&:hover": {
                background: "#0891b2",
              },
            }}
          >
            CREATE TOURNAMENT
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Create;
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

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
    entryFee: "",
    prizePool: "",
    mode: "",
    slots: "",
    regEnd: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, px: 2 }}>
      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: "1100px",
          color: "white",
          background: "linear-gradient(180deg, #0B0F1A 0%, #10131F 100%)",
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
          sx={{ ...fieldStyle, width: "100%", mb: 3 }}
          onChange={handleChange}
        />

        {/* ROW 1 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <TextField
            label="Entry Fee"
            name="entryFee"
            type="number"
            sx={fieldStyle}
            onChange={handleChange}
          />
          <TextField
            label="Prizepool"
            name="prizePool"
            type="number"
            sx={fieldStyle}
            onChange={handleChange}
          />
        </Box>

        {/* ROW 2 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <TextField
            label="Mode"
            name="mode"
            sx={fieldStyle}
            onChange={handleChange}
          />
          <TextField
            label="Slots"
            name="slots"
            type="number"
            sx={fieldStyle}
            onChange={handleChange}
          />
        </Box>

        {/* ROW 3 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <TextField
            label="Registration End Date"
            name="regEnd"
            type="datetime-local"
            sx={fieldStyle}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField
            label="Tournament Start Date"
            name="startDate"
            type="datetime-local"
            sx={fieldStyle}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
        </Box>

        {/* BUTTON */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
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
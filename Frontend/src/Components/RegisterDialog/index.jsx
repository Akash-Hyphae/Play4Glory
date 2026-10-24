import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../Api/axios";

const RegisterDialog = ({
  open,
  onClose,
  tournamentTitle,
  tournamentId,
}) => {
  const [teamName, setTeamName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [players, setPlayers] = useState(
    Array.from({ length: 5 }, () => ({
      name: "",
      ign: "",
      gameId: "",
    }))
  );

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value,
    };
    setPlayers(updatedPlayers);
  };

  const resetForm = () => {
    setTeamName("");
    setPlayers(
      Array.from({ length: 5 }, () => ({
        name: "",
        ign: "",
        gameId: "",
      }))
    );
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    // 1. Guard against missing or undefined tournamentId
    if (!tournamentId || tournamentId === "undefined") {
      alert("Error: Tournament ID is missing or invalid. Please refresh the page and try again.");
      return;
    }

    // 2. Validate Team Name
    if (!teamName.trim()) {
      alert("Please enter a Team Name");
      return;
    }

    // 3. Validate at least Player 1
    if (!players[0].name.trim() || !players[0].ign.trim() || !players[0].gameId.trim()) {
      alert("Please enter Player 1 details (Name, IGN, Game ID)");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        teamName: teamName.trim(),
        teamLogo: "",
        players: players.filter((p) => p.name.trim() !== "" || p.ign.trim() !== ""),
      };

      const res = await api.post(`/registrations/${tournamentId}`, payload);

      alert(res.data.message || "Team Registered Successfully!");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Registration Failed. Please check your wallet balance or credentials."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          background: "linear-gradient(180deg, #0B0F1A 0%, #10131F 100%)",
          borderRadius: "20px",
          border: "1px solid #06B6D4",
          color: "white",
          boxShadow: "0 0 30px rgba(6,182,212,0.3)",
        },
      }}
    >
      {/* ---- HEADER ---- */}
      <DialogTitle
        sx={{
          fontFamily: "Orbitron",
          fontWeight: 700,
          color: "#06B6D4",
          fontSize: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span>Register for {tournamentTitle || "Tournament"}</span>

        <IconButton onClick={handleClose} sx={{ color: "#06B6D4" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* ---- CONTENT ---- */}
      <DialogContent sx={{ mt: 2 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Team Name */}
          <TextField
            label="Team Name"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            variant="outlined"
            InputLabelProps={{
              style: { color: "#aaa" },
            }}
            InputProps={{
              style: {
                color: "white",
                background: "#141827",
                borderRadius: "10px",
              },
            }}
          />

          {/* ---- Players Grid ---- */}
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            sx={{
              width: "100%",
              margin: 0,
            }}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <React.Fragment key={num}>
                <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }}>
                  <TextField
                    label={`Player ${num} Name ${num === 5 ? "(Sub)" : ""}`}
                    fullWidth
                    value={players[num - 1].name}
                    onChange={(e) =>
                      handlePlayerChange(num - 1, "name", e.target.value)
                    }
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: "#aaa" },
                    }}
                    InputProps={{
                      style: {
                        color: "white",
                        background: "#141827",
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }}>
                  <TextField
                    label={`Player ${num} IGN`}
                    fullWidth
                    value={players[num - 1].ign}
                    onChange={(e) =>
                      handlePlayerChange(num - 1, "ign", e.target.value)
                    }
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: "#aaa" },
                    }}
                    InputProps={{
                      style: {
                        color: "white",
                        background: "#141827",
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }}>
                  <TextField
                    label={`Player ${num} Game ID`}
                    type="number"
                    fullWidth
                    value={players[num - 1].gameId}
                    onChange={(e) =>
                      handlePlayerChange(num - 1, "gameId", e.target.value)
                    }
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: "#aaa" },
                    }}
                    InputProps={{
                      style: {
                        color: "white",
                        background: "#141827",
                        borderRadius: "10px",
                      },
                      sx: {
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                          display: "none",
                        },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      },
                    }}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>

          {/* ---- Bottom Actions ---- */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              pt: 2,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderColor: "#06B6D4",
                color: "#06B6D4",
                fontWeight: "bold",
                fontFamily: "Orbitron",
                "&:hover": {
                  background: "#06B6D4",
                  color: "white",
                },
              }}
            >
              Upload Team Logo
              <input type="file" hidden accept="image/*" />
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
              sx={{
                background: "#06B6D4",
                color: "black",
                fontWeight: "bold",
                fontFamily: "Orbitron",
                px: 4,
                py: 1.2,
                borderRadius: "10px",
                "&:hover": {
                  background: "#0891b2",
                },
                "&:disabled": {
                  opacity: 0.5,
                  color: "#555",
                },
              }}
            >
              {submitting ? "Registering..." : "Submit"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
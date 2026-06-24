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

  const [players, setPlayers] = useState(
    Array.from({ length: 5 }, () => ({
      name: "",
      ign: "",
      gameId: "",
    }))
  );

  const handlePlayerChange = (
    index,
    field,
    value
  ) => {
    const updatedPlayers = [...players];

    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value,
    };

    setPlayers(updatedPlayers);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        teamName,
        teamLogo: "",
        players,
      };

      const res = await api.post(
        `/registrations/${tournamentId}`,
        payload
      );

      alert(res.data.message);

      setTeamName("");

      setPlayers(
        Array.from({ length: 5 }, () => ({
          name: "",
          ign: "",
          gameId: "",
        }))
      );

      onClose();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          background:
            "linear-gradient(180deg, #0B0F1A 0%, #10131F 100%)",
          borderRadius: "20px",
          border: "1px solid #06B6D4",
          color: "white",
          boxShadow:
            "0 0 30px rgba(6,182,212,0.3)",
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
          borderBottom:
            "1px solid rgba(255,255,255,0.1)",
        }}
      >
        Register for {tournamentTitle}

        <IconButton
          onClick={onClose}
          sx={{ color: "#06B6D4" }}
        >
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
            onChange={(e) =>
              setTeamName(e.target.value)
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
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{ flexGrow: 1 }}
                >
                  <TextField
                    label={`Player ${num} Name`}
                    fullWidth
                    value={
                      players[num - 1].name
                    }
                    onChange={(e) =>
                      handlePlayerChange(
                        num - 1,
                        "name",
                        e.target.value
                      )
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

                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{ flexGrow: 1 }}
                >
                  <TextField
                    label={`Player ${num} IGN`}
                    fullWidth
                    value={
                      players[num - 1].ign
                    }
                    onChange={(e) =>
                      handlePlayerChange(
                        num - 1,
                        "ign",
                        e.target.value
                      )
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

                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{ flexGrow: 1 }}
                >
                  <TextField
                    label={`Player ${num} ID`}
                    type="number"
                    fullWidth
                    value={
                      players[num - 1].gameId
                    }
                    onChange={(e) =>
                      handlePlayerChange(
                        num - 1,
                        "gameId",
                        e.target.value
                      )
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
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            display: "none",
                          },
                        "& input[type=number]": {
                          MozAppearance:
                            "textfield",
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
              justifyContent:
                "space-between",
              alignItems: "center",
              mt: 1,
              pt: 2,
              borderTop:
                "1px solid rgba(255,255,255,0.1)",
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
              <input type="file" hidden />
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: "#06B6D4",
                color: "white",
                fontWeight: "bold",
                fontFamily: "Orbitron",
                px: 4,
                py: 1.2,
                borderRadius: "10px",
                "&:hover": {
                  background: "#0891b2",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
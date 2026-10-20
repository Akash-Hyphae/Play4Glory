import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { KeyRound, Copy, Check } from "lucide-react";
import api from "../../Api/axios";

const RoomCredentialsModal = ({ open, onClose, tournamentId, tournamentTitle }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    if (!open || !tournamentId) return;

    const fetchMyRoom = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/rooms/my-room/${tournamentId}`);
        setRooms(res.data.rooms || []);
      } catch (error) {
        console.log(error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRoom();
  }, [open, tournamentId]);

  const copyToClipboard = (text, fieldKey) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
      <DialogTitle
        sx={{
          fontFamily: "Orbitron",
          fontWeight: 700,
          color: "#06B6D4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <KeyRound size={22} className="text-cyan-400" />
          <span>Room Credentials</span>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#06B6D4" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 3, pb: 4 }}>
        <Typography sx={{ color: "#9CA3AF", fontSize: "14px", mb: 3 }}>
          Tournament: <span className="text-cyan-300 font-semibold">{tournamentTitle}</span>
        </Typography>

        {loading ? (
          <Typography sx={{ textAlign: "center", py: 4, color: "#06B6D4" }}>
            Fetching room details...
          </Typography>
        ) : rooms.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography sx={{ color: "#F59E0B", fontWeight: 600, mb: 1 }}>
              Room ID & Password Not Published Yet
            </Typography>
            <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>
              The organizer will publish the Room ID and Password 10–15 minutes before the match start time. Please check back shortly.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {rooms.map((room, idx) => (
              <Box
                key={room._id || idx}
                sx={{
                  background: "#141827",
                  border: "1px solid rgba(6,182,212,0.4)",
                  borderRadius: "14px",
                  p: 3,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Chip
                    label={room.group ? `Group: ${room.group}` : "All Groups"}
                    size="small"
                    sx={{ backgroundColor: "#06B6D4", color: "#000", fontWeight: 700 }}
                  />
                  <Chip
                    label={`Map: ${room.mapName || "Erangel"}`}
                    size="small"
                    sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </Box>

                {/* ROOM ID */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#0B0E16",
                    p: 2,
                    borderRadius: "10px",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
                      ROOM ID
                    </Typography>
                    <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
                      {room.roomId}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => copyToClipboard(room.roomId, `id-${idx}`)}
                    sx={{ color: copiedField === `id-${idx}` ? "#22C55E" : "#06B6D4" }}
                  >
                    {copiedField === `id-${idx}` ? <Check size={20} /> : <Copy size={20} />}
                  </IconButton>
                </Box>

                {/* ROOM PASSWORD */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#0B0E16",
                    p: 2,
                    borderRadius: "10px",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
                      PASSWORD
                    </Typography>
                    <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
                      {room.roomPassword}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => copyToClipboard(room.roomPassword, `pass-${idx}`)}
                    sx={{ color: copiedField === `pass-${idx}` ? "#22C55E" : "#06B6D4" }}
                  >
                    {copiedField === `pass-${idx}` ? <Check size={20} /> : <Copy size={20} />}
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoomCredentialsModal;
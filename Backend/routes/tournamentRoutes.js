const express = require("express");

const {
  createTournament,
  joinTournament,
  getAllTournaments,
  getTournamentById,
  getMyTournaments,
  updateLiveStream,
  deleteTournament,
} = require("../controllers/tournamentControllers");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllTournaments);
router.get("/my-tournaments", protect, admin, getMyTournaments);
router.get("/:id", getTournamentById);

// Update stream URL & thumbnail (Admin only)
router.put("/stream/:id", protect, admin, updateLiveStream);

// Delete tournament with cascade (Admin only)
router.delete("/:id", protect, admin, deleteTournament);

// Create Tournament (Admin Only)
router.post("/", protect, admin, createTournament);

// Join Tournament (Logged In User)
router.post("/join/:id", protect, joinTournament);

module.exports = router;
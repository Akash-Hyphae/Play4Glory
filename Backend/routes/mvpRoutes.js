const express = require("express");

const {
  createMVPEntry,
  getTournamentMVP,
  updateMVPEntry,
  deleteMVPEntry,
} = require("../controllers/mvpController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ============================
// Create Player (Admin)
// ============================
router.post(
  "/",
  protect,
  admin,
  createMVPEntry
);

// ============================
// Get Tournament Leaderboard
// ============================
router.get(
  "/:tournamentId",
  getTournamentMVP
);

// ============================
// Update Player
// ============================
router.put(
  "/:id",
  protect,
  admin,
  updateMVPEntry
);

// ============================
// Delete Player
// ============================
router.delete(
  "/:id",
  protect,
  admin,
  deleteMVPEntry
);

module.exports = router;
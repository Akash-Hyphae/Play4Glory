const express = require("express");

const {
  createMVPEntry,
  getTournamentMVP,
  updateMVPEntry,
} = require("../controllers/mvpController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin creates MVP entry
router.post(
  "/",
  protect,
  admin,
  createMVPEntry
);

// Get MVP leaderboard of tournament
router.get(
  "/:tournamentId",
  getTournamentMVP
);

// Admin updates MVP
router.put(
  "/:id",
  protect,
  admin,
  updateMVPEntry
);

module.exports = router;
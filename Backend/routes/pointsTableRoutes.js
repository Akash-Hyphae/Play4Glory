const express = require("express");

const {
  createPointsEntry,
  getTournamentLeaderboard,
  updatePointsEntry,
} = require("../controllers/pointsTableControllers");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin adds team points
router.post(
  "/",
  protect,
  admin,
  createPointsEntry
);

// Get leaderboard of a tournament
router.get(
  "/:tournamentId",
  getTournamentLeaderboard
);

// Admin updates points
router.put(
  "/:id",
  protect,
  admin,
  updatePointsEntry
);

module.exports = router;
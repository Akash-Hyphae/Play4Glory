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

router.post(
  "/",
  protect,
  admin,
  createPointsEntry
);

router.get(
  "/:tournamentId",
  getTournamentLeaderboard
);

router.put(
  "/:id",
  protect,
  admin,
  updatePointsEntry
);

module.exports = router;
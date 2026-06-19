const express = require("express");

const {
  createMatch,
  getTournamentMatches,
  declareWinner,
} = require("../controllers/tdmMatchController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin creates match
router.post(
  "/",
  protect,
  admin,
  createMatch
);

// Get bracket of tournament
router.get(
  "/:tournamentId",
  getTournamentMatches
);

// Admin declares winner
router.put(
  "/winner/:matchId",
  protect,
  admin,
  declareWinner
);

module.exports = router;
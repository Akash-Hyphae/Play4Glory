const express = require("express");

const {
  createMatch,
  getTournamentMatches,
  declareWinner,
  generateBracket,
} = require("../controllers/tdmMatchController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ======================================
// Generate Complete Knockout Bracket
// ======================================
router.post(
  "/generate/:tournamentId",
  protect,
  admin,
  generateBracket
);

// ======================================
// Create Single Match (Optional)
// ======================================
router.post(
  "/",
  protect,
  admin,
  createMatch
);

// ======================================
// Get Tournament Bracket
// ======================================
router.get(
  "/:tournamentId",
  getTournamentMatches
);

// ======================================
// Declare Winner
// ======================================
router.put(
  "/winner/:matchId",
  protect,
  admin,
  declareWinner
);

module.exports = router;
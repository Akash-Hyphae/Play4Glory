const express = require("express");
const {
  getTournamentCalculations,
  distributePrizes,
} = require("../controllers/calculationController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Preview calculation and standings (Admin only)
router.get("/:tournamentId", protect, admin, getTournamentCalculations);

// Execute prize payout to wallets (Admin only)
router.post("/distribute/:tournamentId", protect, admin, distributePrizes);

module.exports = router;
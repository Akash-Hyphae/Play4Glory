// routes/teamRegistrationRoutes.js
const express = require("express");

const {
  registerTeam,
  getTournamentRegistrations,
} = require("../controllers/teamRegistrationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:tournamentId", getTournamentRegistrations);

router.post("/:tournamentId", protect, registerTeam);

module.exports = router;

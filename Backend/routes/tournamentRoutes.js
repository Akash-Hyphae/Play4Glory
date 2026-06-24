const express = require("express");

const {
  createTournament,
  joinTournament,
  getAllTournaments,
  getTournamentById,
  getMyTournaments,
} = require("../controllers/tournamentControllers");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllTournaments);

router.get(
  "/my-tournaments",
  protect,
  admin,
  getMyTournaments
);


router.get("/:id", getTournamentById);

// Create Tournament (Admin Only)
router.post(
  "/",
  protect,
  admin,
  createTournament
);

// Join Tournament (Logged In User)
router.post(
  "/join/:id",
  protect,
  joinTournament,
);

module.exports = router;
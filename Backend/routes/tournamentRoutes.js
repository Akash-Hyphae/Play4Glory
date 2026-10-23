const express = require("express");

const {
  createTournament,
  joinTournament,
  getAllTournaments,
  getTournamentById,
  getMyTournaments,
  updateLiveStream,
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

router.put(
  "/stream/:id",
  protect,
  admin,
  updateLiveStream
);

// Create Tournament (Admin Only)
router.post(
  " fantasy",
  protect,
  admin,
  createTournament
);

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
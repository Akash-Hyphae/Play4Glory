const express = require("express");

const {
  createTournament,
} = require("../controllers/tournamentControllers");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  admin,
  createTournament
);

module.exports = router;
const express = require("express");

const {
  createRoom,
  getTournamentRooms,
  publishRoom,
  getMyRoomPass,
} = require("../controllers/roomController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin creates room
router.post(
  "/",
  protect,
  admin,
  createRoom
);

// Admin gets all rooms of tournament
router.get(
  "/tournament/:tournamentId",
  protect,
  admin,
  getTournamentRooms
);

// Admin publishes room
router.put(
  "/publish/:roomId",
  protect,
  admin,
  publishRoom
);

// Users get room credentials
router.get(
  "/my-room/:tournamentId",
  protect,
  getMyRoomPass
);

module.exports = router;
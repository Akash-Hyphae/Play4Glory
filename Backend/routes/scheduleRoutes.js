const express = require("express");

const {
  createSchedule,
  getTournamentSchedule,
  updateSchedule,
  markLive,
  markCompleted,
} = require("../controllers/scheduleController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  admin,
  createSchedule
);

router.get(
  "/:tournamentId",
  getTournamentSchedule
);

router.put(
  "/:id",
  protect,
  admin,
  updateSchedule
);

router.put(
  "/live/:id",
  protect,
  admin,
  markLive
);

router.put(
  "/completed/:id",
  protect,
  admin,
  markCompleted
);

module.exports = router;
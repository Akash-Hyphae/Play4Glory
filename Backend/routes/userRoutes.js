const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard,
  getMyTournaments,
  getWallet
} = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get(
  "/my-tournaments",
  protect,
  getMyTournaments
);

router.get(
  "/wallet",
  protect,
  getWallet
);

router.get("/admin", protect, admin, adminDashboard);

module.exports = router;
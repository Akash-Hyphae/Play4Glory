const express = require("express");

const {
  createWithdrawRequest,
  getMyWithdrawRequests,
  getAllWithdrawRequests,
  approveWithdrawRequest,
  rejectWithdrawRequest,
} = require("../controllers/withdrawController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// User
router.post(
  "/",
  protect,
  createWithdrawRequest
);

router.get(
  "/my-requests",
  protect,
  getMyWithdrawRequests
);

// Admin
router.get(
  "/all",
  protect,
  admin,
  getAllWithdrawRequests
);

router.put(
  "/approve/:id",
  protect,
  admin,
  approveWithdrawRequest
);

router.put(
  "/reject/:id",
  protect,
  admin,
  rejectWithdrawRequest
);

module.exports = router;
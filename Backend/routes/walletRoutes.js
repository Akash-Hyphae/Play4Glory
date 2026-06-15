const express = require("express");

const {
  getWalletHistory,
  addMoney,
} = require("../controllers/walletController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/history",
  protect,
  getWalletHistory
);

router.post(
  "/add-money",
  protect,
  addMoney
);

module.exports = router;
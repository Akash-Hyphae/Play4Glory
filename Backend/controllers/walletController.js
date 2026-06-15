const WalletTransaction = require("../models/walletTransaction");
const User = require("../models/User");

const getWalletHistory = async (req, res) => {
  try {
    const transactions = await WalletTransaction.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addMoney = async (req, res) => {
  try {
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid Amount",
      });
    }
    const { amount } = req.body;

    const user = await User.findById(req.user._id);
    user.walletBalance += amount;
    await user.save();

    await WalletTransaction.create({
      user: req.user._id,
      amount,
      type: "deposit",
      status: "completed",
      description: "Money Added",
    });

    res.status(200).json({
      success: true,
      message: "Money Added Successfully",
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getWalletHistory,
  addMoney,
};

const WithdrawRequest = require("../models/WithdrawRequest");
const WalletTransaction = require("../models/walletTransaction");
const User = require("../models/user");

const createWithdrawRequest = async (req, res) => {
  try {
    const { amount, upiId } = req.body;

    const user = await User.findById(req.user._id);

    if (amount <= 0) {
      return res.status(400).json({
        message: "Invalid Amount",
      });
    }

    if (user.walletBalance < amount) {
      return res.status(400).json({
        message: "Insufficient Wallet Balance",
      });
    }

    const request = await WithdrawRequest.create({
      user: req.user._id,
      amount,
      upiId,
    });

    res.status(201).json({
      success: true,
      message: "Withdraw Request Submitted",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyWithdrawRequests = async (req, res) => {
  try {
    const requests = await WithdrawRequest.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllWithdrawRequests = async (req, res) => {
  try {
    const requests = await WithdrawRequest.find()
      .populate("user", "displayName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveWithdrawRequest = async (req, res) => {
  try {
    const request = await WithdrawRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request Not Found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request Already Processed",
      });
    }

    const user = await User.findById(request.user);

    user.walletBalance -= request.amount;
    user.totalWithdraw += request.amount;

    await user.save();

    request.status = "approved";
    await request.save();

    await WalletTransaction.create({
      user: user._id,
      amount: request.amount,
      type: "withdraw",
      status: "completed",
      description: "Withdraw Approved",
    });

    res.status(200).json({
      success: true,
      message: "Withdraw Approved",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectWithdrawRequest = async (req, res) => {
  try {
    const request = await WithdrawRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request Not Found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request Already Processed",
      });
    }

    request.status = "rejected";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Withdraw Rejected",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createWithdrawRequest,
  getMyWithdrawRequests,
  getAllWithdrawRequests,
  approveWithdrawRequest,
  rejectWithdrawRequest,
};

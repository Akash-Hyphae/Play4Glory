const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      enum: [
        "deposit",
        "withdraw",
        "entry_fee",
        "winnings",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "completed",
        "failed",
      ],
      default: "pending",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WalletTransaction",
  walletTransactionSchema
);
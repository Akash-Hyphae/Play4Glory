const mongoose = require("mongoose");

const mvpSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    playerName: {
      type: String,
      required: true,
    },

    teamName: {
      type: String,
      required: true,
    },

    kills: {
      type: Number,
      default: 0,
    },

    damage: {
      type: Number,
      default: 0,
    },

    survivalTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MVP", mvpSchema);
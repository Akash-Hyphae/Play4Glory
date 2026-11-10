const mongoose = require("mongoose");

const playerSubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },
    ign: {
      type: String,
      default: "",
      trim: true,
    },
    gameId: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const teamRegistrationSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    registeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    teamName: {
      type: String,
      required: true,
      trim: true,
    },

    teamLogo: {
      type: String,
      default: "",
    },

    players: {
      type: [playerSubSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "TeamRegistration",
  teamRegistrationSchema
);
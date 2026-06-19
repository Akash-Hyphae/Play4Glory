const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "TeamRegistration",
  teamRegistrationSchema
);

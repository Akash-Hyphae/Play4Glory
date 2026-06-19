const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    round: {
      type: String,
      required: true,
    },

    mapName: {
      type: String,
      default: "Erangel",
    },

    startTime: {
      type: Date,
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "upcoming",
        "live",
        "completed",
      ],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Schedule",
  scheduleSchema
);
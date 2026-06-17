const mongoose = require("mongoose");

const pointsTableSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    teamName: {
      type: String,
      required: true,
    },

    group: {
      type: String,
      required: true,
    },

    placementPoints: {
      type: Number,
      default: 0,
    },

    finishPoints: {
      type: Number,
      default: 0,
    },

    chickenPoints: {
      type: Number,
      default: 0,
    },

    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PointsTable",
  pointsTableSchema
);
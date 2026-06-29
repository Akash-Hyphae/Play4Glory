const mongoose = require("mongoose");

const pointsTableSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamRegistration",
      required: true,
    },

    group: {
      type: String,
      enum: [
        "A",
        "B",
        "C",
        "D",
        "SF1",
        "SF2",
        "FINAL",
      ],
      default: "A",
    },

    placementPoints: {
      type: Number,
      default: 0,
    },

    finishPoints: {
      type: Number,
      default: 0,
    },

    chickenDinners: {
      type: Number,
      default: 0,
    },

    totalPoints: {
      type: Number,
      default: 0,
    },

    qualified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

pointsTableSchema.index(
  {
    tournament: 1,
    team: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "PointsTable",
  pointsTableSchema
);
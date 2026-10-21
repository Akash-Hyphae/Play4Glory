const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    roomId: {
      type: String,
      required: true,
      trim: true,
    },

    roomPassword: {
      type: String,
      required: true,
      trim: true,
    },

    group: {
      type: String,
      default: "All",
      trim: true,
    },

    mapName: {
      type: String,
      default: "Erangel",
      trim: true,
    },

    roundNumber: {
      type: Number,
      default: 1,
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
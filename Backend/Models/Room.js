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
    },

    roomPassword: {
      type: String,
      required: true,
    },

    mapName: {
      type: String,
      default: "Erangel",
    },

    roundNumber: {
      type: Number,
      default: 1,
    },

    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Room",
  roomSchema
);
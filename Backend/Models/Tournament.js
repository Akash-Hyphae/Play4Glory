const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    eventType: {
      type: String,
      required: true,
      enum: ["tournament", "scrim", "tdm"],
    },

    game: {
      type: String,
      required: true,
      enum: ["BGMI", "Free Fire", "COD Mobile"],
    },

    tournamentType: {
      type: String,
      required: true,
      enum: ["Solo", "Duo", "Squad"],
    },

    entryFee: {
      type: Number,
      required: true,
      min: 0,
    },

    maxSlots: {
      type: Number,
      required: true,
    },

    filledSlots: {
      type: Number,
      default: 0,
    },

    hostFeePercent: {
      type: Number,
      default: 10,
    },

    platformFeePercent: {
      type: Number,
      default: 10,
    },

    startTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "live", "completed", "cancelled"],
      default: "upcoming",
    },

    bannerImage: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tournament", tournamentSchema);

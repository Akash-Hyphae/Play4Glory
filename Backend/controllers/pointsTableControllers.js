const PointsTable = require("../models/PointsTable");
const Tournament = require("../models/Tournament");
const TeamRegistration = require("../models/TeamRegistration");

const createPointsEntry = async (req, res) => {
  try {
    const {
      tournament,
      team,
      placementPoints,
      finishPoints,
      chickenDinners,
    } = req.body;

    const totalPoints =
      placementPoints +
      finishPoints +
      chickenDinners;

    const pointsEntry = await PointsTable.create({
      tournament,
      team,
      placementPoints,
      finishPoints,
      chickenDinners,
      totalPoints,
    });

    res.status(201).json({
      success: true,
      pointsEntry,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTournamentLeaderboard = async (req, res) => {
  try {
    const leaderboard = await PointsTable.find({
      tournament: req.params.tournamentId,
    })
      .populate("team", "teamName")
      .sort({ totalPoints: -1 });

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePointsEntry = async (req, res) => {
  try {
    const {
      placementPoints,
      finishPoints,
      chickenDinners,
    } = req.body;

    const totalPoints =
      placementPoints +
      finishPoints +
      chickenDinners;

    const pointsEntry = await PointsTable.findByIdAndUpdate(
      req.params.id,
      {
        placementPoints,
        finishPoints,
        chickenDinners,
        totalPoints,
      },
      {
        new: true,
      }
    );

    if (!pointsEntry) {
      return res.status(404).json({
        message: "Points Entry Not Found",
      });
    }

    res.status(200).json({
      success: true,
      pointsEntry,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPointsEntry,
  getTournamentLeaderboard,
  updatePointsEntry,
};
const PointsTable = require("../models/PointsTable");

const createPointsEntry = async (req, res) => {
  try {
    const {
      tournament,
      team,
      group,
      placementPoints,
      finishPoints,
      chickenDinners,
    } = req.body;

    const totalPoints =
      Number(placementPoints) +
      Number(finishPoints) +
      Number(chickenDinners);

    const pointsEntry = await PointsTable.create({
      tournament,
      team,
      group,
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
      .populate("team", "teamName teamLogo")
      .sort({
        totalPoints: -1,
        chickenDinners: -1,
      });

    const groupedData = {
      A: leaderboard.filter((team) => team.group === "A"),
      B: leaderboard.filter((team) => team.group === "B"),
      C: leaderboard.filter((team) => team.group === "C"),
      D: leaderboard.filter((team) => team.group === "D"),
      SF1: leaderboard.filter((team) => team.group === "SF1"),
      SF2: leaderboard.filter((team) => team.group === "SF2"),
      FINAL: leaderboard.filter((team) => team.group === "FINAL"),
    };

    res.status(200).json({
      success: true,
      groupedData,
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
      Number(placementPoints) +
      Number(finishPoints) +
      Number(chickenDinners);

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
    ).populate("team", "teamName");

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
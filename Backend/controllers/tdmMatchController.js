const TDMMatch = require("../models/TDMMatch");
const Tournament = require("../models/Tournament");
const TeamRegistration = require("../models/TeamRegistration");

const createMatch = async (req, res) => {
  try {
    const { tournament, round, teamA, teamB, matchTime } = req.body;

    const match = await TDMMatch.create({
      tournament,
      round,
      teamA,
      teamB,
      matchTime,
    });

    res.status(201).json({
      success: true,
      match,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTournamentMatches = async (req, res) => {
  try {
    const matches = await TDMMatch.find({
      tournament: req.params.tournamentId,
    })
      .populate("teamA", "teamName")
      .populate("teamB", "teamName")
      .populate("winner", "teamName")
      .sort({
        createdAt: 1,
      });

    res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const declareWinner = async (req, res) => {
  try {
    const { winner } = req.body;

    const match = await TDMMatch.findById(req.params.matchId);

    if (!match) {
      return res.status(404).json({
        message: "Match Not Found",
      });
    }

    if (
      winner.toString() !== match.teamA.toString() &&
      winner.toString() !== match.teamB.toString()
    ) {
      return res.status(400).json({
        message: "Winner must be Team A or Team B",
      });
    }

    match.winner = winner;
    match.status = "completed";

    await match.save();

    res.status(200).json({
      success: true,
      message: "Winner Declared",
      match,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMatch,
  getTournamentMatches,
  declareWinner,
};

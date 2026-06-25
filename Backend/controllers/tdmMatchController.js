const TDMMatch = require("../models/TDMMatch");
const Tournament = require("../models/Tournament");
const TeamRegistration = require("../models/TeamRegistration");

// ======================================
// Create Single Match (Optional)
// ======================================
const createMatch = async (req, res) => {
  try {
    const {
      tournament,
      round,
      matchNumber,
      teamA,
      teamB,
      matchTime,
    } = req.body;

    const match = await TDMMatch.create({
      tournament,
      round,
      matchNumber,
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

// ======================================
// Get Tournament Matches
// ======================================
const getTournamentMatches = async (req, res) => {
  try {
    const matches = await TDMMatch.find({
      tournament: req.params.tournamentId,
    })
      .populate("teamA", "teamName")
      .populate("teamB", "teamName")
      .populate("winner", "teamName")
      .sort({
        round: 1,
        matchNumber: 1,
      });

    res.status(200).json({
      success: true,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Declare Winner
// ======================================
const declareWinner = async (req, res) => {
  try {
    const { winner } = req.body;

    const match = await TDMMatch.findById(req.params.matchId);

    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    if (match.winner) {
      return res.status(400).json({
        message: "Winner already declared",
      });
    }

    if (
      winner.toString() !== match.teamA.toString() &&
      winner.toString() !== match.teamB.toString()
    ) {
      return res.status(400).json({
        message: "Invalid Winner",
      });
    }

    match.winner = winner;
    match.status = "completed";

    await match.save();

    // Move winner to next match
    if (match.nextMatch) {
      const nextMatch = await TDMMatch.findById(match.nextMatch);

      if (!nextMatch.teamA) {
        nextMatch.teamA = winner;
      } else {
        nextMatch.teamB = winner;
      }

      await nextMatch.save();
    }

    res.status(200).json({
      success: true,
      message: "Winner Declared Successfully",
      match,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Generate Complete 64 Team Bracket
// ======================================
const generateBracket = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const existing = await TDMMatch.find({
      tournament: tournamentId,
    });

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Bracket already generated",
      });
    }

    const teams = await TeamRegistration.find({
      tournament: tournamentId,
    });

    if (teams.length !== 64) {
      return res.status(400).json({
        message: "Bracket requires exactly 64 teams",
      });
    }

    teams.sort(() => Math.random() - 0.5);

    const allMatches = [];

    // Round 1 (32 Matches)
    for (let i = 0; i < 32; i++) {
      allMatches.push({
        tournament: tournamentId,
        round: 1,
        matchNumber: i + 1,
        teamA: teams[i * 2]._id,
        teamB: teams[i * 2 + 1]._id,
      });
    }

    // Round 2 (16 Matches)
    for (let i = 0; i < 16; i++) {
      allMatches.push({
        tournament: tournamentId,
        round: 2,
        matchNumber: i + 1,
      });
    }

    // Round 3 (8 Matches)
    for (let i = 0; i < 8; i++) {
      allMatches.push({
        tournament: tournamentId,
        round: 3,
        matchNumber: i + 1,
      });
    }

    // Quarter Finals (4)
    for (let i = 0; i < 4; i++) {
      allMatches.push({
        tournament: tournamentId,
        round: 4,
        matchNumber: i + 1,
      });
    }

    // Semi Finals (2)
    for (let i = 0; i < 2; i++) {
      allMatches.push({
        tournament: tournamentId,
        round: 5,
        matchNumber: i + 1,
      });
    }

    // Final (1)
    allMatches.push({
      tournament: tournamentId,
      round: 6,
      matchNumber: 1,
    });

    const createdMatches = await TDMMatch.insertMany(allMatches);

    // Round1 -> Round2
    for (let i = 0; i < 32; i++) {
      createdMatches[i].nextMatch =
        createdMatches[32 + Math.floor(i / 2)]._id;
      await createdMatches[i].save();
    }

    // Round2 -> Round3
    for (let i = 32; i < 48; i++) {
      createdMatches[i].nextMatch =
        createdMatches[48 + Math.floor((i - 32) / 2)]._id;
      await createdMatches[i].save();
    }

    // Round3 -> Quarter
    for (let i = 48; i < 56; i++) {
      createdMatches[i].nextMatch =
        createdMatches[56 + Math.floor((i - 48) / 2)]._id;
      await createdMatches[i].save();
    }

    // Quarter -> Semi
    for (let i = 56; i < 60; i++) {
      createdMatches[i].nextMatch =
        createdMatches[60 + Math.floor((i - 56) / 2)]._id;
      await createdMatches[i].save();
    }

    // Semi -> Final
    createdMatches[60].nextMatch = createdMatches[62]._id;
    await createdMatches[60].save();

    createdMatches[61].nextMatch = createdMatches[62]._id;
    await createdMatches[61].save();

    res.status(201).json({
      success: true,
      count: createdMatches.length,
      matches: createdMatches,
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
  generateBracket,
};
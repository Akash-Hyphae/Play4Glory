const TDMMatch = require("../models/TDMMatch");
const Tournament = require("../models/Tournament");
const TeamRegistration = require("../models/TeamRegistration");

// ======================================
// Create Single Match (Optional manual creation)
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
      .populate("teamA", "teamName teamLogo")
      .populate("teamB", "teamName teamLogo")
      .populate("winner", "teamName teamLogo")
      .sort({
        round: 1,
        matchNumber: 1,
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

// ======================================
// Declare Winner & Advance to Next Round
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
        message: "Winner already declared for this match",
      });
    }

    if (!match.teamA || !match.teamB) {
      return res.status(400).json({
        message: "Both teams must be present before declaring a winner",
      });
    }

    if (
      winner.toString() !== match.teamA.toString() &&
      winner.toString() !== match.teamB.toString()
    ) {
      return res.status(400).json({
        message: "Winner must be one of the competing teams",
      });
    }

    match.winner = winner;
    match.status = "completed";
    await match.save();

    // Advance winner to the linked nextMatch
    if (match.nextMatch) {
      const nextMatch = await TDMMatch.findById(match.nextMatch);

      if (nextMatch) {
        // Odd matchNumbers advance into teamA, even matchNumbers into teamB
        if (match.matchNumber % 2 !== 0) {
          nextMatch.teamA = winner;
        } else {
          nextMatch.teamB = winner;
        }

        if (nextMatch.teamA && nextMatch.teamB) {
          nextMatch.status = "upcoming";
        }

        await nextMatch.save();
      }
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
// Generate Dynamic Bracket (8, 16, 32, or 64 Teams)
// ======================================
const generateBracket = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    // Check if bracket already exists
    const existing = await TDMMatch.find({
      tournament: tournamentId,
    });

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Bracket already generated for this tournament",
      });
    }

    // Fetch registered teams
    const teams = await TeamRegistration.find({
      tournament: tournamentId,
    });

    const teamCount = teams.length;
    const allowedCounts = [8, 16, 32, 64];

    if (!allowedCounts.includes(teamCount)) {
      return res.status(400).json({
        message: `TDM Knockout bracket requires exactly 8, 16, 32, or 64 teams. Currently registered: ${teamCount} teams.`,
      });
    }

    // Shuffle registered teams for fair pairing
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

    // Calculate total number of rounds: log2(N)
    // 8 teams  => 3 rounds (Quarters, Semis, Final)
    // 16 teams => 4 rounds (Round of 16, Quarters, Semis, Final)
    // 32 teams => 5 rounds
    // 64 teams => 6 rounds
    const totalRounds = Math.log2(teamCount);
    const roundMatchMap = {};

    // 1. Create Round 1 matches with paired teams
    const round1Count = teamCount / 2;
    const round1Docs = [];

    for (let i = 0; i < round1Count; i++) {
      round1Docs.push({
        tournament: tournamentId,
        round: 1,
        matchNumber: i + 1,
        teamA: shuffledTeams[i * 2]._id,
        teamB: shuffledTeams[i * 2 + 1]._id,
        status: "upcoming",
      });
    }

    roundMatchMap[1] = await TDMMatch.insertMany(round1Docs);

    // 2. Generate placeholder empty matches for future rounds
    for (let round = 2; round <= totalRounds; round++) {
      const matchCountInRound = teamCount / Math.pow(2, round);
      const roundDocs = [];

      for (let i = 0; i < matchCountInRound; i++) {
        roundDocs.push({
          tournament: tournamentId,
          round,
          matchNumber: i + 1,
          teamA: null,
          teamB: null,
          status: "upcoming",
        });
      }

      roundMatchMap[round] = await TDMMatch.insertMany(roundDocs);
    }

    // 3. Link each match to its parent match in the next round
    for (let round = 1; round < totalRounds; round++) {
      const currentMatches = roundMatchMap[round];
      const nextMatches = roundMatchMap[round + 1];

      for (let i = 0; i < currentMatches.length; i++) {
        const nextMatchIndex = Math.floor(i / 2);
        currentMatches[i].nextMatch = nextMatches[nextMatchIndex]._id;
        await currentMatches[i].save();
      }
    }

    // Fetch and return the structured bracket
    const allMatches = await TDMMatch.find({ tournament: tournamentId })
      .populate("teamA", "teamName")
      .populate("teamB", "teamName")
      .sort({ round: 1, matchNumber: 1 });

    res.status(201).json({
      success: true,
      message: `${teamCount}-Team Bracket Generated Successfully (${totalRounds} Rounds)`,
      teamCount,
      totalRounds,
      count: allMatches.length,
      matches: allMatches,
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
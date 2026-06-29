const TeamRegistration = require("../models/TeamRegistration");
const Tournament = require("../models/Tournament");
const User = require("../models/user");
const WalletTransaction = require("../models/walletTransaction");
const PointsTable = require("../models/PointsTable");



const registerTeam = async (req, res) => {
  try {
    const { teamName, teamLogo, players } = req.body;

    const tournamentId = req.params.tournamentId;

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament Not Found",
      });
    }

    if (tournament.filledSlots >= tournament.maxSlots) {
      return res.status(400).json({
        message: "Tournament Full",
      });
    }

    const existingRegistration = await TeamRegistration.findOne({
      tournament: tournamentId,
      registeredBy: req.user._id,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "You have already registered",
      });
    }

    const user = await User.findById(req.user._id);

    if (user.walletBalance < tournament.entryFee) {
      return res.status(400).json({
        message: "Insufficient Wallet Balance",
      });
    }

    const registration = await TeamRegistration.create({
      tournament: tournamentId,
      registeredBy: req.user._id,
      teamName,
      teamLogo,
      players,
    });

    // Assign Group Automatically
    const totalTeams = await TeamRegistration.countDocuments({
      tournament: tournamentId,
    });

    let group = "A";

    if (totalTeams <= 16) {
      group = "A";
    } else if (totalTeams <= 32) {
      group = "B";
    } else if (totalTeams <= 48) {
      group = "C";
    } else {
      group = "D";
    }

    // Create Points Table Entry
    await PointsTable.create({
      tournament: tournamentId,
      team: registration._id,
      group,
      placementPoints: 0,
      finishPoints: 0,
      chickenDinners: 0,
      totalPoints: 0,
    });

    user.walletBalance -= tournament.entryFee;

    if (!user.joinedTournaments.includes(tournament._id)) {
      user.joinedTournaments.push(tournament._id);
    }

    await user.save();

    await WalletTransaction.create({
      user: req.user._id,
      amount: tournament.entryFee,
      type: "entry_fee",
      status: "completed",
      description: `Team Registered in ${tournament.title}`,
    });

    tournament.filledSlots += 1;

    await tournament.save();

    res.status(201).json({
      success: true,
      message: "Team Registered Successfully",
      registration,
      group,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTournamentRegistrations = async (req, res) => {
  try {
    const registrations = await TeamRegistration.find({
      tournament: req.params.tournamentId,
    }).populate("registeredBy", "displayName inGameName");

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerTeam,
  getTournamentRegistrations,
};
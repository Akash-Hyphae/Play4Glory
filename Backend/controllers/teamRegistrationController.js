const TeamRegistration = require("../models/TeamRegistration");
const Tournament = require("../models/Tournament");
const User = require("../models/User");
const WalletTransaction = require("../models/walletTransaction");

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

    // Check Wallet Balance
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

    user.walletBalance -= tournament.entryFee;

    // Add Tournament To User History
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

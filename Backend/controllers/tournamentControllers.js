const Tournament = require("../models/Tournament");
const User = require("../models/User");

const createTournament = async (req, res) => {
  try {
    const { title, game, tournamentType, entryFee, maxSlots, startTime } =
      req.body;

    const tournament = await Tournament.create({
      title,
      game,
      tournamentType,
      entryFee,
      maxSlots,
      startTime,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Tournament Created Successfully",
      tournament,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const joinTournament = async (req, res) => {
  try {
    const tournamentId = req.params.id;

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
    const alreadyJoined = tournament.participants.includes(req.user._id);

    if (alreadyJoined) {
      return res.status(400).json({
        message: "You have already joined this tournament",
      });
    }
    tournament.participants.push(req.user._id);

    tournament.filledSlots += 1;

    await tournament.save();

    const user = await User.findById(req.user._id);

    user.joinedTournaments.push(tournament._id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Tournament Joined Successfully",
      tournament,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();

    res.status(200).json({
      success: true,
      count: tournaments.length,
      tournaments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTournamentById = async (req, res) => {
  try {
    const tournamentId = req.params.id;

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament Not Found",
      });
    }

    const totalCollection = tournament.entryFee * tournament.filledSlots;

    const hostAmount = (totalCollection * tournament.hostFeePercent) / 100;

    const platformAmount =
      (totalCollection * tournament.platformFeePercent) / 100;

    const prizePool = totalCollection - hostAmount - platformAmount;

    const firstPrize = prizePool * 0.6;

    const secondPrize = prizePool * 0.25;

    const thirdPrize = prizePool * 0.1;

    const mvpPrize = prizePool * 0.05;

    res.status(200).json({
      success: true,
      tournament,

      calculations: {
        totalCollection,
        hostAmount,
        platformAmount,
        prizePool,
        firstPrize,
        secondPrize,
        thirdPrize,
        mvpPrize,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createTournament,
  joinTournament,
  getAllTournaments,
  getTournamentById,
};

const Tournament = require("../models/Tournament");

const createTournament = async (req, res) => {
  try {
    const {
      title,
      game,
      tournamentType,
      entryFee,
      maxSlots,
      startTime,
    } = req.body;

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

module.exports = {
  createTournament,
};
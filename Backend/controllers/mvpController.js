const MVP = require("../models/MVP");

const createMVPEntry = async (req, res) => {
  try {
    const mvp = await MVP.create(req.body);

    res.status(201).json({
      success: true,
      mvp,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTournamentMVP = async (req, res) => {
  try {
    const mvpPlayers = await MVP.find({
      tournament: req.params.tournamentId,
    }).sort({
      kills: -1,
      damage: -1,
    });

    res.status(200).json({
      success: true,
      count: mvpPlayers.length,
      mvpPlayers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMVPEntry = async (req, res) => {
  try {
    const mvp = await MVP.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      mvp,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMVPEntry,
  getTournamentMVP,
  updateMVPEntry,
};
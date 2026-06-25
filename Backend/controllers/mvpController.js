const MVP = require("../models/MVP");

const createMVPEntry = async (req, res) => {
  try {
    const {
      tournament,
      playerName,
      teamName,
      kills,
      damage,
      survivalTime,
    } = req.body;

    const mvp = await MVP.create({
      tournament,
      playerName,
      teamName,
      kills,
      damage,
      survivalTime,
    });

    const players = await MVP.find({
      tournament,
    }).sort({
      kills: -1,
      damage: -1,
      survivalTime: -1,
    });

    res.status(201).json({
      success: true,
      mvp,
      players,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTournamentMVP = async (req, res) => {
  try {
    const players = await MVP.find({
      tournament: req.params.tournamentId,
    }).sort({
      kills: -1,
      damage: -1,
      survivalTime: -1,
    });

    res.status(200).json({
      success: true,
      players,
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

    if (!mvp) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    const players = await MVP.find({
      tournament: mvp.tournament,
    }).sort({
      kills: -1,
      damage: -1,
      survivalTime: -1,
    });

    res.status(200).json({
      success: true,
      mvp,
      players,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMVPEntry = async (req, res) => {
  try {
    const mvp = await MVP.findById(req.params.id);

    if (!mvp) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    await mvp.deleteOne();

    res.status(200).json({
      success: true,
      message: "Player removed successfully",
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
  deleteMVPEntry,
};
const Room = require("../models/Room");
const TeamRegistration = require("../models/TeamRegistration");

const createRoom = async (req, res) => {
  try {
    const {
      tournament,
      roomId,
      roomPassword,
      mapName,
      roundNumber,
    } = req.body;

    const room = await Room.create({
      tournament,
      roomId,
      roomPassword,
      mapName,
      roundNumber,
    });

    res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTournamentRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      tournament: req.params.tournamentId,
    });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const publishRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.roomId,
      {
        published: true,
      },
      {
        new: true,
      }
    );

    if (!room) {
      return res.status(404).json({
        message: "Room Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room Published",
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyRoomPass = async (req, res) => {
  try {
    const registration =
      await TeamRegistration.findOne({
        tournament: req.params.tournamentId,
        registeredBy: req.user._id,
      });

    if (!registration) {
      return res.status(403).json({
        message:
          "You are not registered in this tournament",
      });
    }

    const rooms = await Room.find({
      tournament: req.params.tournamentId,
      published: true,
    });

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRoom,
  getTournamentRooms,
  publishRoom,
  getMyRoomPass,
};
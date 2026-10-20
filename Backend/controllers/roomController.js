const Room = require("../models/Room");
const TeamRegistration = require("../models/TeamRegistration");

const createRoom = async (req, res) => {
  try {
    const {
      tournament,
      roomId,
      roomPassword,
      group = "All",
      mapName = "Erangel",
      roundNumber = 1,
      published = true,
    } = req.body;

    if (!tournament || !roomId || !roomPassword) {
      return res.status(400).json({
        message: "Tournament ID, Room ID, and Room Password are required",
      });
    }

    const room = await Room.create({
      tournament,
      roomId,
      roomPassword,
      group,
      mapName,
      roundNumber,
      published,
    });

    res.status(201).json({
      success: true,
      message: "Room credentials saved and published successfully",
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
    }).sort({ createdAt: -1 });

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
    const registration = await TeamRegistration.findOne({
      tournament: req.params.tournamentId,
      registeredBy: req.user._id,
    });

    if (!registration) {
      return res.status(403).json({
        message: "You are not registered in this tournament",
      });
    }

    const rooms = await Room.find({
      tournament: req.params.tournamentId,
      published: true,
    }).sort({ createdAt: -1 });

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
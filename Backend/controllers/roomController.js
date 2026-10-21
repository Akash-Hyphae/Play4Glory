const Room = require("../models/Room");
const TeamRegistration = require("../models/TeamRegistration");
const Tournament = require("../models/Tournament");

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
    const { tournamentId } = req.params;

    // Check if tournament exists
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament Not Found",
      });
    }

    // Check if user is registered via TeamRegistration (as captain or team member)
    const teamReg = await TeamRegistration.findOne({
      tournament: tournamentId,
      $or: [
        { registeredBy: req.user._id },
        { "players.gameId": req.user.inGameId },
      ],
    });

    // Check if user is in tournament direct participants array (solo/duo joins)
    const isParticipant =
      tournament.participants &&
      tournament.participants.some(
        (id) => id.toString() === req.user._id.toString()
      );

    // Block access only if user is completely unregistered
    if (!teamReg && !isParticipant) {
      return res.status(403).json({
        message: "You are not registered in this tournament",
      });
    }

    // Fetch all published rooms for this tournament
    const rooms = await Room.find({
      tournament: tournamentId,
      published: true,
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

module.exports = {
  createRoom,
  getTournamentRooms,
  publishRoom,
  getMyRoomPass,
};
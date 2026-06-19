const Schedule = require("../models/Schedule");

const createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);

    res.status(201).json({
      success: true,
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTournamentSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find({
      tournament: req.params.tournamentId,
    })
      .populate("room")
      .sort({
        startTime: 1,
      });

    res.status(200).json({
      success: true,
      count: schedules.length,
      schedules,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const schedule =
      await Schedule.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!schedule) {
      return res.status(404).json({
        message: "Schedule Not Found",
      });
    }

    res.status(200).json({
      success: true,
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const markLive = async (req, res) => {
  try {
    const schedule =
      await Schedule.findByIdAndUpdate(
        req.params.id,
        {
          status: "live",
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const markCompleted = async (req, res) => {
  try {
    const schedule =
      await Schedule.findByIdAndUpdate(
        req.params.id,
        {
          status: "completed",
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSchedule,
  getTournamentSchedule,
  updateSchedule,
  markLive,
  markCompleted,
};
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { displayName, email, password, inGameName, inGameId } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const existingInGameName = await User.findOne({inGameName});

    if (existingInGameName) {
      return res.status(400).json({
        message: "This in game name already exists",
      });
    }

    const existingInGameId = await User.findOne({inGameId});

    if (existingInGameId) {
      return res.status(400).json({
        message: "This Id already exists",
      });
    }

    // Create new user
    const user = await User.create({
      displayName,
      email,
      password,
      inGameName,
      inGameId
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
};
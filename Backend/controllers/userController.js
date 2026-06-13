const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const existingInGameName = await User.findOne({ inGameName });

    if (existingInGameName) {
      return res.status(400).json({
        message: "This in game name already exists",
      });
    }

    const existingInGameId = await User.findOne({ inGameId });

    if (existingInGameId) {
      return res.status(400).json({
        message: "This Id already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      displayName,
      email,
      password: hashedPassword,
      inGameName,
      inGameId,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: {
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        inGameName: user.inGameName,
        inGameId: user.inGameId,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,

      user: {
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        inGameName: user.inGameName,
        inGameId: user.inGameId,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const adminDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
};

const getMyTournaments = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "joinedTournaments",
    );

    res.status(200).json({
      success: true,
      count: user.joinedTournaments.length,
      tournaments: user.joinedTournaments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard,
  getMyTournaments
};

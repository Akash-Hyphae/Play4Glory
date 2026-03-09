import User from "../Models/user.js"
import bcrypt from "bcrypt";
import generateToken from "../Utils/generateToken.js";

// SIGNUP
export const registerUser = async (req, res) => {

  const { name, email, password, ign, igid } = req.body;

  try {

    // 1. Check user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      ign,
      igid
    });

    // 4. Send response + token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGIN
export const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    // 2. Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    // 3. Send token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

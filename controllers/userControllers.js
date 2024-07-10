const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

// Register a new user
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const hashpassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      username,
      password: hashpassword,
      role: role,
    });
    console.log("usercreation:", createUser);

    res.status(201).json({
      _id: createUser._id,
      username: createUser.username,
      role: createUser.role,
      // token: generateToken(User._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const userAvailable = await User.findOne({ username });
  const decodePassword = await bcrypt.compare(password, userAvailable.password);
  if (userAvailable && decodePassword) {
    const token = await jwt.sign(
      {
        user: {
          id: userAvailable.id,
          username: userAvailable.username,
        },
      },
      process.env.ACCESS_STRING_TOKEN
    );

    return res
      .status(200)
      .json({ message: "successfully logged in ", token: token });
  } else {
    return res.status(400).json({ message: "Credentials are incorrect" });
  }
};
const homeData = async (req, res) => {
  res.status(200).json({ message: "Home welcome" });
};

module.exports = { registerUser, loginUser, homeData };

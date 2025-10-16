const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateHighScore = async (req, res) => {
  const { email, highScore } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (highScore > user.highScore) {
      user.highScore = highScore;
      await user.save();
    }

    res.status(200).json({ message: "High score updated", highScore: user.highScore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const n = parseInt(req.query.n) || 5; // Default to 5 if n is not provided
    const leaderboard = await User.find({})
      .sort({ highScore: -1 }) // Sort by high score in descending order
      .limit(n) // Use the n parameter to limit the results
      .select("email highScore -_id"); // Select only email and highScore fields

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHighScore = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ highScore: user.highScore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, updateHighScore, getLeaderboard, getHighScore };

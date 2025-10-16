const express = require("express");

const { loginUser, signupUser, updateHighScore, getLeaderboard } = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.patch("/highscore", updateHighScore); // Add this route
router.get("/leaderboard", getLeaderboard); // Add this route

module.exports = router;

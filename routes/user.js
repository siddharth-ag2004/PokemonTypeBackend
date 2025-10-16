const express = require("express");

const { loginUser, signupUser, updateHighScore, getLeaderboard } = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.patch("/highscore", updateHighScore);
router.get("/leaderboard", getLeaderboard);

module.exports = router;

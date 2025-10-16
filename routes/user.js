const express = require("express");

const { loginUser, signupUser, updateHighScore, getLeaderboard, getHighScore } = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.patch("/highscore", updateHighScore);
router.get("/leaderboard", getLeaderboard);
router.get("/highscore", getHighScore);

module.exports = router;

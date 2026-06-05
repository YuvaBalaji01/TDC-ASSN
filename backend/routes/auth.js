const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username,
    password,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
    },
  });
});

module.exports = router;
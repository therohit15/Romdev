const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const profileRouter = express.Router();
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = { profileRouter };

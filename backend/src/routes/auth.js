const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User loggged out");
});
module.exports = { authRouter };

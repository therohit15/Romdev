const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const decodedObj = jwt.verify(token, "password");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("Unauthorized: User not found.");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send("Forbidden: " + err.message);
  }
};
module.exports = {
  userAuth,
};

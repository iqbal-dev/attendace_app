const jwt = require("jsonwebtoken");
const User = require("../models/User");
const error = require("../utils/error");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authenticate;

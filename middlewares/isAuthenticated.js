const isAuthenticated = async (req, res, next) => {
  console.log("passage authentification");
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    const User = require("../models/User");
    const user = await User.findOne({ token: token });
    if (user) {
      req.owner = user;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = isAuthenticated;

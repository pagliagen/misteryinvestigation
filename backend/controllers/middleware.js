const User = require("../models/User"); 
const { extractUserIdFromToken } = require("../services/jwtHelper");

const UserController = {
  validateJWT: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Token not provided");
      }

      const userId = extractUserIdFromToken(token);
      if (!userId) {
        throw new Error("Invalid token");
      }

      req.userId = userId;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        throw new Error("Invalid token");
      }
      if (!user.isAdmin) {
        throw new Error("User is not Admin");
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: "User is not a Admin", debug: error.message });
    }
  },

  isMaster: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        throw new Error("Invalid token");
      }
      if (!user.isMaster) {
        throw new Error("User is not master");
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: "User is not a Master" });
    }
  },
};

module.exports = UserController;

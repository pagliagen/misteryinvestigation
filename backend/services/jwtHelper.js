const jwt = require("jsonwebtoken");
const { config } = require("../../config");

exports.extractUserIdFromToken = (token) => {
  if (config.jwt.secret) {
    const decodedToken = jwt.verify(token.split(" ")[1], config.jwt.secret);
    return decodedToken.userId;
  } else {
    throw new Error("JWT secret not set" + JSON.stringify(config));
  }
};

exports.createJWTToken = (userId, username) => {
  return jwt.sign({ userId, username }, config.jwt.secret, {
    expiresIn: "24h",
  });
};

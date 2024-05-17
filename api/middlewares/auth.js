// Load environment variables from .env file
require("dotenv").config();
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
const userManager = require("../managers/user");

// Middleware function to authenticate users
module.exports = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header(constants.TOKEN_NAME) || false;
  if (!token)
    return res.status(401).send(`Access denied. Invalid token provided.`);

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    // Fetch the user by decoded userId from the token
    const user = await userManager.getById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .send(`Access denied. Access level not authorized.`);
    }

    // Attach token data to the request object
    req.tokenData = decoded;
    next();
  } catch (ex) {
    // Handle invalid or expired token
    return res.status(400).send(`Access denied. No token provided.`);
  }
};

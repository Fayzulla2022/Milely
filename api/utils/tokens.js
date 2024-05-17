require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  // Function to generate a JWT token for a user
  getJwt: async (userId) => {
    try {
      const data = { userId }; // Payload containing user ID
      const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY); // Sign the token with the private key
      return token; // Return the generated token
    } catch (ex) {
      throw ex; // Throw an exception if something goes wrong
    }
  },
};

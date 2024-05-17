const bcrypt = require("bcryptjs");

module.exports = {
  // Function to hash a password
  hash: async (pass) => {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashed = await bcrypt.hash(pass, salt); // Hash the password with the salt
    return hashed; // Return the hashed password
  },
  // Function to compare a password with a hashed password
  compare: async (pass, hashedPassword) => {
    const result = await bcrypt.compare(pass, hashedPassword); // Compare the password with the hashed password
    return result; // Return the comparison result (true or false)
  },
};

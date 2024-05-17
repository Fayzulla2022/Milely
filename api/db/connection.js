// Load environment variables from .env file
require("dotenv").config();

// Import mongoose to interact with MongoDB
const mongoose = require("mongoose");

// Connect to MongoDB using the connection string from environment variables
mongoose
  .connect(process.env.DB_CONNECTION_STRING) // Connect to MongoDB using the connection string from the environment variable
  .then((db) => console.log("Connected with MongoDB.")) // Log success message on successful connection
  .catch(
    (err) => console.log(`Unable to connect with MongoDB: ${err.message}`) // Log error message if connection fails
  );

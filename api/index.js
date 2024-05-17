// Importing the MongoDB connection setup
require("./db/connection");

// Setting up our Express server along with CORS and body-parser
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Importing user routes to handle user-related requests
const users = require("./routes/user");

// Middleware to handle cross-origin requests and parse incoming request bodies
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Basic route to check if the API is working
app.get("/", (req, res) => res.status(200).send("API is working..."));

// Routes for handling user operations like signup, login, etc.
app.use("/users", users);

// Setting the server to listen on port specified in environment or default to 4000
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

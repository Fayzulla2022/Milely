// Import necessary modules and dependencies
const router = require("express").Router();
const userValidations = require("../validations/user");
const getErrorDetails = require("../utils/error-details");
const auth = require("../middlewares/auth");
const userManager = require("../managers/user");
const crypto = require("../utils/crypto");
const utils = require("../utils/utils");
const tokens = require("../utils/tokens");
const emailManager = require("../managers/email");

// Route to handle user signup
// http://localhost:4000/users/signup
router.post("/signup", async (req, res) => {
  try {
    // Validate user input
    const error = userValidations.signup(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    // Check if email already exists
    let user = await userManager.getByEmail(req.body.email);
    if (user)
      return res
        .status(400)
        .send(`Email already exists please choose another email address.`);

    // Create new user with hashed password
    const obj = {
      ...req.body,
      password: await crypto.hash(req.body.password),
    };
    user = await userManager.create(obj);

    // Send activation email
    const link = `${process.env.ACTIVATE_ACCOUNT_URL}?token=${user._id}`;
    let html = await utils.readTemplate(`activate`);
    html = utils.replaceAll(`{{appName}}`, process.env.APP_NAME, html);
    html = utils.replaceAll(`{{link}}`, link, html);
    await emailManager.send({
      to: req.body.email,
      subject: "Verify your email address",
      html: html,
    });

    return res.status(200).send(true);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle account activation
router.post("/activate", async (req, res) => {
  try {
    // Validate request
    const error = userValidations.activate(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    // Activate user account
    let user = await userManager.getById(req.body.token);
    if (!user)
      return res.status(400).send(`Invalid account activation token provided.`);
    user = await userManager.updateActiveStatus(req.body.token, true);

    // Send welcome email
    let html = await utils.readTemplate(`welcome`);
    html = utils.replaceAll(`{{name}}`, user.name, html);
    html = utils.replaceAll(`{{appName}}`, process.env.APP_NAME, html);
    emailManager.send({
      to: user.email,
      subject: `Welcome to ${process.env.APP_NAME}`,
      html: html,
    });

    return res.status(200).json(true);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle user login
router.post("/login", async (req, res) => {
  try {
    // Validate user input
    const error = userValidations.login(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    // Check if user exists and password matches
    const user = await userManager.getByEmail(req.body.email);
    if (!user)
      return res.status(400).send(`User does not exists with this email.`);
    const passwordMatches = await crypto.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatches)
      return res.status(400).send(`Password did not match.`);
    if (user.active === false)
      return res
        .status(400)
        .send(`User is not active. Please activate via signup email.`);

    // Generate JWT token
    const token = await tokens.getJwt(user._id);
    const result = {
      token: token,
      user: user,
    };
    return res.status(200).send(result);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle updating user details
router.post("/update", auth, async (req, res) => {
  try {
    // Update user name and level
    let user = await userManager.updateName(
      req.tokenData.userId,
      req.body.name
    );
    user = await userManager.updateLevel(req.tokenData.userId, req.body.level);
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle adding favourite
router.post("/add-favourite", auth, async (req, res) => {
  try {
    // Add to user's favourites
    let user = await userManager.addFavourite(
      req.tokenData.userId,
      req.body.id
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle removing favourite
router.post("/remove-favourite", auth, async (req, res) => {
  try {
    // Remove from user's favourites
    let user = await userManager.removeFavourite(
      req.tokenData.userId,
      req.body.id
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle updating user tags
router.post("/tags", auth, async (req, res) => {
  try {
    // Update user's tags
    let user = await userManager.updateTags(
      req.tokenData.userId,
      req.body.tags
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle updating user level
router.post("/level", auth, async (req, res) => {
  try {
    // Update user's level
    let user = await userManager.updateLevel(
      req.tokenData.userId,
      req.body.level
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle adding a roadmap
router.post("/add-roadmap", auth, async (req, res) => {
  try {
    // Add roadmap to user's account
    let user = await userManager.addRoadmap(req.tokenData.userId, req.body);
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle removing a roadmap
router.post("/remove-roadmap", auth, async (req, res) => {
  try {
    // Remove roadmap from user's account
    let user = await userManager.removeRoadmap(
      req.tokenData.userId,
      req.body?.id
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Route to handle updating a roadmap
router.post("/update-roadmap", auth, async (req, res) => {
  try {
    // Get the current user's roadmaps
    let u = await userManager.getById(req.tokenData.userId);
    let roadmaps = u?.roadmaps || [];

    // Find and update the specific roadmap
    for (let i = 0; i < roadmaps?.length; i++) {
      if (roadmaps[i]?.id == req.body?.id) {
        roadmaps[i] = req.body;
      }
    }

    // Update the user's roadmaps
    let user = await userManager.updateRoadmap(req.tokenData.userId, roadmaps);
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

module.exports = router;

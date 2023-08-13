const express = require("express");
const { mainRouter } = require("./routes/main");
const { profileRouter } = require("./routes/profile");
const { registrationRouter } = require("./routes/register");
const { loginRouter } = require("./routes/login");
const { getErrorPage } = require("./controllers/main");
const { attachJWTToAuthorizationHeader } = require("./controllers/util/middlewares");
const router = express.Router();

router.use(attachJWTToAuthorizationHeader);

// Main controller contains get home page controller, get settings page controller, and post logout controller
router.use("/", mainRouter);

// Register controller contains get and post controllers that serve the registration page
router.use("/register", registrationRouter);

// Login controller contains get and post controllers that serve the login page
router.use("/login", loginRouter);

// Profile controller contains get controller of a specific user's profile page
router.use("/profile", profileRouter);

// 404 controller
router.use('/', getErrorPage);

module.exports = { appRouter: router };
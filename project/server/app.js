const express = require("express");
const { homePageController } = require("./controllers/home-page");
const { profileController } = require("./controllers/profile");
const { registerController } = require("./controllers/register");
const { loginController } = require("./controllers/login");
const router = express.Router();

router.use("/", homePageController);

router.use("/register", registerController);

router.use("/login", loginController);

router.use("/profile", profileController);

module.exports = { appRouters: router };
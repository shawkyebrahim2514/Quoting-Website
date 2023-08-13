const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profile");

router.get("/:username", getProfile);

module.exports = { profileRouter: router };
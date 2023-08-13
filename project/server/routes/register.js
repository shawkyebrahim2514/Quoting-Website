const express = require("express");
const router = express.Router();
const { checkUserLoggedOut } = require("../controllers/util/authentications.js");
const { getRegistrationPage, postRegistration } = require("../controllers/register.js");


router.route("/")
    .get(checkUserLoggedOut, getRegistrationPage)
    .post(postRegistration);

module.exports = { registrationRouter: router };
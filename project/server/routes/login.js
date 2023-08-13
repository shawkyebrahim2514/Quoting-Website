const express = require("express");
const router = express.Router();
const { checkUserLoggedOut } = require("../controllers/util/authentications.js");
const { getLoginPage, postLogin } = require("../controllers/login.js");


router.route("/")
    .get(checkUserLoggedOut, getLoginPage)
    .post(checkUserLoggedOut, postLogin);

module.exports = { loginRouter: router };
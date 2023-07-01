const express = require("express");
const router = express.Router();
const { checkUserLoggedIn, decodeJWT } = require("./util/authentications.js");

router.get("/", (req, res) => {
    const decodedToken = decodeJWT(req.headers.authorization);
    res.render("home-page", { authenticated: decodedToken.username });
});

router.post("/logout", checkUserLoggedIn, (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = { homePageController: router };
const express = require("express");
const router = express.Router();
const User = require("./graphql/User");
const { decodeJWT } = require("./util/authentications");

router.get("/:username", (req, res) => {
    (async () => {
        const decodedToken = decodeJWT(req.headers.authorization);
        let user = await User.getUserName(req.params.username);
        if (!user) {
            return res.render("404", { authenticated: decodedToken.username });
        }
        let authorized = checkProfileAuthorization(req, decodedToken);
        res.render("profile", { authorized, user: user, authenticated: decodedToken.username });
    })();
});

function checkProfileAuthorization(req, decodedToken) {
    return decodedToken && decodedToken.username === req.params.username ? req.params.username : null;
}

module.exports = { profileController: router };
const express = require("express");
const router = express.Router();
const User = require("./graphql/User");
const { decodeJWT } = require("./util/authentications");

router.get("/:username", (req, res) => {
    (async () => {
        const decodedToken = decodeJWT(req.headers.authorization);
        // Send this request to the GraphQL server
        let user = await User.getUser(req.params.username);
        if (!user) {
            // authenticated is an object that used in the navbar of this page
            return res.render("404", { authenticated: { username: decodedToken.username } });
        }
        // Replace all the newline character with <br> tag to be rendered in the HTML
        user.bio = user.bio.replace(/\n/g, '<br>');
        let isAuthorized = checkProfileAuthorization(req, decodedToken);
        // isAuthorized is a boolean that used to show the quote creation form in the profile page and the logout button
        //      if the logged in user is the owner of this profile
        // authenticated is an object that used in the navbar of this page
        // user is an object that used to show the profile information in the profile page
        res.render("profile", {
            isAuthorized,
            user: user,
            authenticated: { username: decodedToken.username }
        });
    })();
});

function checkProfileAuthorization(req, decodedToken) {
    // Checks if the logged in user is the owner of this profile
    return decodedToken && decodedToken.username === req.params.username ? true : false;
}

module.exports = { profileController: router };
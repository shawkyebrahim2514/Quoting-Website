const router = require("express").Router();
const User = require("./graphql/User");
const { checkUserLoggedIn, decodeJWT } = require("./util/authentications.js");

router.get("/", (req, res) => {
    // Check the validation of the JWT token
    const decodedToken = decodeJWT(req.headers.authorization);
    // authenticated is an object that used in the navbar and
    // to display the quote creation form
    res.render("home-page", {
        authenticated: { username: decodedToken.username }
    });
});

// User who want to visit this page must be logged in
router.get("/settings", checkUserLoggedIn, (req, res) => {
    (async () => {
        // Check the validation of the JWT token
        const decodedToken = decodeJWT(req.headers.authorization);
        // Get user info to put it in the settings' form
        const user = await User.getUser(decodedToken.username);
        // authenticated is an object that used in the navbar of this page
        // and to fill the default value of the settings' form
        res.render("profile-settings", { authenticated: user });
    })();
});

// User who want to logout must be logged in
router.post("/logout", checkUserLoggedIn, (req, res) => {
    // Clear the JWT token from the cookies, JWT is stored with `token` key
    res.clearCookie('token');
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = { mainController: router };
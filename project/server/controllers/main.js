const User = require("./graphql/User");
const { decodeJWT, clearJWTCookie } = require("./util/authentications.js");

const getHomePage = (req, res) => {
    // Check the validation of the JWT token
    const decodedToken = decodeJWT(req.headers.authorization);
    // authenticated is an object that used in the navbar and
    // to display the quote creation form
    res.render("home-page", {
        authenticated: { username: decodedToken.username }
    });
};

// User who want to visit this page must be logged in
const getSettingsPage = (req, res) => {
    (async () => {
        // Check the validation of the JWT token
        const decodedToken = decodeJWT(req.headers.authorization);
        // Get user info to put it in the settings' form
        const user = await User.getUser(decodedToken.username);
        // authenticated is an object that used in the navbar of this page
        // and to fill the default value of the settings' form
        res.render("profile-settings", { authenticated: user });
    })();
};

// User who want to logout must be logged in
const postLogout = (req, res) => {
    clearJWTCookie(res);
    res.json({ success: true, message: 'Logout successful' });
};

const getErrorPage = (req, res, next) => {
    // Check the validation of the JWT token
    const decodedToken = decodeJWT(req.headers.authorization);
    // authenticated is an object that used in the navbar of this page
    res.render('404', {
        authenticated: { username: decodedToken.username }
    });
}

module.exports = {
    getHomePage,
    getSettingsPage,
    postLogout,
    getErrorPage
};
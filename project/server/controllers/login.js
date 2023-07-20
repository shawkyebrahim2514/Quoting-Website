const express = require("express");
const router = express.Router();
const User = require("./graphql/User");
const { checkUserUnloggedIn, createJWTTokenInCookie } = require("./util/authentications.js");

// User who want to visit this page must be logged out
router.get("/", checkUserUnloggedIn, (req, res) => {
    res.render("login");
});

router.post("/", (req, res) => {
    (async () => {
        try {
            const user = parseLoginRequestBody(req);
            // Send this request to the GraphQL server
            const response = await User.checkUserAuthentication(user);
            if (response.success) {
                createJWTTokenInCookie(user, res);
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    })();
});

function parseLoginRequestBody(req) {
    let user = {
        username: req.body.username,
        password: req.body.password,
    };
    return user;
}

module.exports = { loginController: router };
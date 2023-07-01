const express = require("express");
const router = express.Router();
const User = require("./graphql/User");
const { checkUserUnloggedIn, createJWTToken } = require("./util/authentications.js");

router.get("/", checkUserUnloggedIn, (req, res) => {
    res.render("login");
});

router.post("/", (req, res) => {
    (async () => {
        try {
            const user = parseLoginRequestBody(req);
            const response = await User.checkUserAuthentication(user);
            if (response.success) {
                const token = createJWTToken(user);
                res.cookie('token', `Bearer ${token}`, { httpOnly: true, maxAge: 3600000, encode: String });
                res.json({ success: true, message: 'Login successful', token });
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
const express = require("express");
const router = express.Router();
const User = require("./graphql/User");
const { checkUserUnloggedIn, createJWTToken } = require("./util/authentications.js");

router.get("/", checkUserUnloggedIn, (req, res) => {
    res.render("register");
});

router.post("/", (req, res) => {
    (async () => {
        try {
            let user = parseRegisterRequestBody(req);
            let response = await User.createUser(user);
            if (response.success) {
                const token = createJWTToken(user);
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
                res.json({ success: true, message: 'Registration successful' });
            } else {
                res.status(401).json({ success: false, message: 'User Exists before!' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    })();
});

function parseRegisterRequestBody(req) {
    let user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    return user;
}

module.exports = { registerController: router };
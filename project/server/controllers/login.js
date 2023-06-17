const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.js");
const { checkUserUnloggedIn, createUserSession } = require("./util/authentications.js");

router.get("/", checkUserUnloggedIn, (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    let user = parseLoginRequestBody(req);
    let response = await UserModel.checkUserAuthentication(user);
    if (response.success) {
        createUserSession(req, user);
    }
    return res.json(response);
});

function parseLoginRequestBody(req) {
    let user = {
        username: req.body.username,
        password: req.body.password,
    };
    return user;
}

module.exports = { loginController: router };
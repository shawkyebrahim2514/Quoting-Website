const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.js");
const { checkUserUnloggedIn, createUserSession } = require("./util/authentications.js");


router.get("/", checkUserUnloggedIn, (req, res) => {
    res.render("register");
});

router.post("/", async (req, res) => {
    let user = parseRegisterRequestBody(req);
    let response = await UserModel.createUser(user);
    if (response.success) {
        createUserSession(req, user);
    }
    return res.json(response);
});

function parseRegisterRequestBody(req) {
    let user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.second_name,
    };
    return user;
}

module.exports = { registerController: router };
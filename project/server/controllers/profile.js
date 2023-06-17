const express = require("express");
const router = express.Router();
const QuoteModel = require("../models/Quote.js");
const UserModel = require("../models/User.js");
const { formQuotesResponse } = require("./util/quote-util.js");

router.get("/:username", async (req, res) => {
    let user = await UserModel.getUserName(req.params.username);
    let authorized = checkProfileAuthorization(req);
    res.render("profile", { authorized, user: user, authenticated: req.session.username });
});

function checkProfileAuthorization(req) {
    return req.session.username === req.params.username ? req.session.username : null;
}

router.post("/:username/get-quotes", async (req, res) => {
    let offset = req.body.offset;
    let response = await QuoteModel.getQuotes({ offset, loggedInUser: req.session.username, username: req.params.username });
    if (response) {
        response = formQuotesResponse(response, req.session.username);
    }
    return res.json(response);
});

module.exports = { profileController: router };
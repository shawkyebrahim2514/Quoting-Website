const express = require("express");
const router = express.Router();
const QuoteModel = require("../models/Quote.js");
const UserModel = require("../models/User.js");
const { formQuotesResponse } = require("./util/quote-util.js");

router.get("/:username", async (req, res) => {
    let user = await UserModel.getUserName(req.params.username);
    let authorized = checkProfileAuthorization(req);
    res.render("profile", { authorized, user: user, authenticated: req.session.user });
});

function checkProfileAuthorization(req) {
    return req.session.user && req.session.user.username === req.params.username ? req.session.user.username : null;
}

router.post("/:username/get-quotes", async (req, res) => {
    let offset = req.body.offset;
    let response = await QuoteModel.getQuotes({ offset, username: req.params.username, sessionId: req.sessionID });
    if (response) {
        response = formQuotesResponse(response,
            req.session.user ? req.session.user.username : null);
    }
    return res.json(response);
});

module.exports = { profileController: router };
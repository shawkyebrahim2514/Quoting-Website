const express = require("express");
const router = express.Router();
const QuoteModel = require("../models/Quote.js");
const { checkUserLoggedIn } = require("./util/authentications.js");
const { formQuotesResponse, formQuoteResponse, parseQuote } = require("./util/quote-util.js");

router.post("/create-quote", checkUserLoggedIn, async (req, res) => {
    let quote = parseQuote(req);
    let response = await QuoteModel.createQuote(quote, req.sessionID);
    if (response.success) {
        response.quote = formQuoteResponse(response.quote, req.session.username);
    }
    return res.json(response);
});

router.post("/get-quotes", async (req, res) => {
    let offset = req.body.offset;
    let response = await QuoteModel.getQuotes({ offset, loggedInUser: req.session.username, sessionId: req.sessionID });
    if (response) {
        response = formQuotesResponse(response, req.session.username);
    }
    return res.json(response);
});

router.post("/like-quote", checkUserLoggedIn, async (req, res) => {
    let quoteId = req.body.quoteId;
    let response = await QuoteModel.likeQuote(quoteId, req.sessionID);
    return res.json(response);
});

router.post("/dislike-quote", checkUserLoggedIn, async (req, res) => {
    let quoteId = req.body.quoteId;
    let response = await QuoteModel.dislikeQuote(quoteId, req.sessionID);
    return res.json(response);
});

router.post("/delete-quote", checkUserLoggedIn, async (req, res) => {
    let quoteId = req.body.quoteId;
    let response = await QuoteModel.deleteQuote(quoteId, req.sessionID);
    return res.json(response);
});

router.post("/update-quote", checkUserLoggedIn, async (req, res) => {
    let quoteData = req.body;
    let response = await QuoteModel.updateQuote(quoteData, req.sessionID);
    return res.json(response);
});

module.exports = { quoteController: router };
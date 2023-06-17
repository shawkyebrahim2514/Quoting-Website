function formQuotesResponse(response, username) {
    return response.map(quote => {
        return formQuoteResponse(quote, username);
    });
}

function formQuoteResponse(quote, username) {
    return {
        ...quote,
        isLogged: username ? true : false,
        isOwned: username === quote.author.username ? true : false,
    }
}

function parseQuote(req) {
    let quote = req.body;
    return quote;
}

module.exports = { formQuotesResponse, formQuoteResponse, parseQuote };
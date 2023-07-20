import Quote from "../graphql/Quote.js";

async function* getQuotes(username = null) {
    let offset = 0;
    while (true) {
        let quotes = await Quote.getQuotes({ offset, username });
        if (quotes.length === 0) {
            break;
        }
        offset += quotes.length;
        yield quotes;
    }
}

async function sendDeleteQuoteRequest(quoteId) {
    const response = await Quote.deleteQuote(quoteId);
    return response;
}

async function sendLikeQuote(quoteId) {
    const response = await Quote.likeQuote(quoteId);
    return response;
}

async function sendDislikeQuote(quoteId) {
    const response = await Quote.dislikeQuote(quoteId);
    return response;
}

async function sendCreateQuoteRequest(formData) {
    const response = await Quote.createQuote(formData);
    return response;
}

async function sendUpdateQuoteRequest(formData) {
    const response = await Quote.updateQuote(formData);
    return response;
}

async function sendSearchQuotesRequest(word) {
    const response = await Quote.searchQuotes(word);
    return response;
}

async function getFullQuoteInfo(quoteId) {
    const response = await Quote.getFullQuoteInfo(quoteId);
    return response;
}

export {
    getQuotes,
    sendDeleteQuoteRequest,
    sendLikeQuote,
    sendDislikeQuote,
    sendCreateQuoteRequest,
    sendUpdateQuoteRequest,
    sendSearchQuotesRequest,
    getFullQuoteInfo,
};
async function* getQuotes() {
    let offest = 0;
    while (true) {
        let quotes = await sendGetQuotesRequest(offest);
        if (quotes.length === 0) {
            break;
        }
        offest += quotes.length;
        yield quotes;
    }
}

async function sendGetQuotesRequest(offset) {
    let currentPath = location.pathname;
    if (currentPath === "/") {
        currentPath = "";
    }
    const url = `${currentPath}/get-quotes`;
    const response = await (await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offset }),
    })).json();
    return response;
}

async function sendDeleteQuoteRequest(quoteId) {
    let response = await (await fetch('/delete-quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteId }),
    })).json();
    return response.deleteQuote;
}

async function sendLikeQuote(quoteId) {
    const response = await (await fetch('/like-quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteId }),
    })).json();
    return response.likeQuote;
}

async function sendDislikeQuote(quoteId) {
    const response = await (await fetch('/dislike-quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteId }),
    })).json();
    return response.dislikeQuote;
}

async function sendCreateQuoteRequest(formData) {
    const response = await (await fetch('/create-quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })).json();
    return response;
}

async function sendUpdateQuoteRequest(formData) {
    const response = await (await fetch('/update-quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })).json();
    return response;
}

export {
    getQuotes,
    sendDeleteQuoteRequest,
    sendLikeQuote,
    sendDislikeQuote,
    sendCreateQuoteRequest,
    sendUpdateQuoteRequest
};
import { hideOverlay } from "./main.js";

window.addEventListener('load', () => {
    document.querySelector(".load-more").click();
    hideOverlay();
});

async function* getQuotes() {
    let offest = 0;
    while (true) {
        let quotes = await sendRequest(offest);
        if (quotes.length === 0) {
            removeLoadMoreButton();
            break;
        }
        offest += quotes.length;
        yield quotes;
    }
}

async function sendRequest(offset) {
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

let quotes = getQuotes();

document.querySelector(".load-more").addEventListener("click", async (event) => {
    event.preventDefault();
    let quotesData = await quotes.next();
    let quotesContainer = document.querySelector(".quotes-container");
    quotesData.value.forEach(quote => {
        let quoteElement = createQuoteElement(quote);
        quotesContainer.appendChild(quoteElement);
    });
});

function createQuoteElement(quote) {
    let quoteElement = document.createElement("article");
    quoteElement.classList.add("quote");
    quoteElement.setAttribute("data-id", quote.id);
    quoteElement.innerHTML = `
        ${quote.isOwned ? addSettingsOption(quote) : ''}
        <div class="likes ${quote.isLiked ? 'active' : ''} ${quote.isLogged ? 'clicked' : ''}">
            <p><i class="fa-solid fa-heart fa-lg"></i></p>
            <p>${quote.numberOfLikes}</p>
        </div>
        <section class="quote-info">
            <h3 class='title'>${quote.title}</h3>
            <a href='/profile/${quote.author.username}' class='author'>From: ${quote.author.first_name} ${quote.author.last_name}</a>
            <p class='date'>Date: ${quote.created_at.substr(0, 10)}</p>
        </section>
        <section class="content">
            <p>${quote.content}</p>
        </section>
    `;
    addQuoteSettingsEvents(quoteElement);
    addLikeEvent(quoteElement);
    return quoteElement;
}

function addSettingsOption(quote) {
    return `
        <div class="settings">
            <i class="fa-solid fa-cog fa-lg"></i>
            <div class="settings-options">
                <div class="edit">Edit</div>
                <div class="delete">Delete</div>
            </div>
        </div>
    `
}

function addQuoteSettingsEvents(quoteElement) {
    let settings = quoteElement.querySelector(".settings");
    if (settings) {
        settings.querySelector("i").addEventListener("click", function (event) {
            event.preventDefault();
            settings.querySelector(".settings-options").classList.toggle("show");
        });
        addQuoteEditEvent(quoteElement);
        addQuoteDeleteEvent(quoteElement);
    }
}

function addQuoteEditEvent(quoteElement) {
    quoteElement.querySelector(".edit").addEventListener("click", function (event) {
        event.preventDefault();
        let quoteEditing = document.querySelector(".quote-editing");
        quoteEditing.classList.toggle("show");
        quoteEditing.attributes["data-id"].value = quoteElement.getAttribute("data-id");
        quoteEditing.querySelector("input#title").value = quoteElement.querySelector(".title").textContent;
        quoteEditing.querySelector("textarea#content").value = quoteElement.querySelector(".content p").textContent;
    });
}

function addQuoteDeleteEvent(quoteElement) {
    quoteElement.querySelector(".delete").addEventListener("click", async function (event) {
        event.preventDefault();
        let quoteId = +quoteElement.getAttribute("data-id");
        let response = await sendDeleteQuoteRequest(quoteId);
        if (response.success) {
            quoteElement.parentNode.removeChild(quoteElement);
        }
    });
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

function addLikeEvent(quoteElement) {
    quoteElement.querySelector(".likes").addEventListener("click", async function (event) {
        event.preventDefault();
        let quoteId = +quoteElement.getAttribute("data-id");
        let numberOfLikes = this.querySelector("p:last-child");
        let response;
        if (this.classList.contains("active")) {
            response = await dislikeQuote(quoteId);
            if (response.success) {
                numberOfLikes.textContent = Number(numberOfLikes.textContent) - 1;
            }
        } else {
            response = await likeQuote(quoteId);
            if (response.success) {
                numberOfLikes.textContent = Number(numberOfLikes.textContent) + 1;
            }
        }
        if (response.success) {
            this.classList.toggle("active");
        }
    });
}

async function likeQuote(quoteId) {
    const response = await (await fetch('/like-quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteId }),
    })).json();
    return response.likeQuote;
}

async function dislikeQuote(quoteId) {
    const response = await (await fetch('/dislike-quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteId }),
    })).json();
    return response.dislikeQuote;
}

function removeLoadMoreButton() {
    let loadMoreButton = document.querySelector(".load-more");
    loadMoreButton.parentNode.removeChild(loadMoreButton);
}

export { createQuoteElement };
import { sendDeleteQuoteRequest, sendLikeQuote, sendDislikeQuote } from "./quote-requests.js";

function createQuoteElement(quote) {
    let quoteElement = document.createElement("article");
    quoteElement.classList.add("quote");
    quoteElement.setAttribute("data-id", quote._id);
    quoteElement.innerHTML = `
        ${quote.isOwned ? addSettingsOption(quote) : ''}
        <div class="likes ${quote.isLiked ? 'active' : ''} ${quote.isLogged ? 'clicked' : ''}">
            <p><i class="fa-solid fa-heart fa-lg"></i></p>
            <p>${quote.numberOfLikes}</p>
        </div>
        <section class="quote-info">
            <h3 class='title'>${quote.title}</h3>
            <a href='/profile/${quote.author.username}' class='author'>By: ${quote.author.first_name} ${quote.author.last_name}</a>
            <p class='date'>From: ${quote.created_at.substr(0, 10)}</p>
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
    quoteElement.querySelector(".quote .settings .edit").addEventListener("click", function (event) {
        event.preventDefault();
        let quoteEditing = document.querySelector(".quote-editing");
        quoteEditing.classList.toggle("show");
        quoteEditing.attributes["data-id"].value = quoteElement.getAttribute("data-id");
        quoteEditing.querySelector("input#title").setAttribute("value", quoteElement.querySelector(".quote-info .title").textContent);
        quoteEditing.querySelector("textarea#content").textContent = quoteElement.querySelector(".content p").textContent;
    });
}

function addQuoteDeleteEvent(quoteElement) {
    quoteElement.querySelector(".delete").addEventListener("click", async function (event) {
        event.preventDefault();
        let quoteId = quoteElement.getAttribute("data-id");
        let response = await sendDeleteQuoteRequest(quoteId);
        if (response.success) {
            quoteElement.parentNode.removeChild(quoteElement);
        }
    });
}

function addLikeEvent(quoteElement) {
    quoteElement.querySelector(".likes").addEventListener("click", async function (event) {
        event.preventDefault();
        let quoteId = quoteElement.getAttribute("data-id");
        let numberOfLikes = this.querySelector("p:last-child");
        let response;
        if (this.classList.contains("active")) {
            response = await sendDislikeQuote(quoteId);
            if (response.success) {
                numberOfLikes.textContent = Number(numberOfLikes.textContent) - 1;
            }
        } else {
            response = await sendLikeQuote(quoteId);
            if (response.success) {
                numberOfLikes.textContent = Number(numberOfLikes.textContent) + 1;
            }
        }
        if (response.success) {
            this.classList.toggle("active");
        }
    });
}

export { createQuoteElement };
import { createQuoteElement } from "./quote-creation.js";
import { hideOverlay, addToggleNavbarLinks } from "./main.js";
import { getQuotes, sendCreateQuoteRequest, sendUpdateQuoteRequest } from "./quote-requests.js";
import { checkValidQuoteFormInputs } from "./form-validations.js";
import { showMessage } from "./messages.js";

window.addEventListener('load', () => {
    addToggleNavbarLinks();
    addFormSubmitEvent();
    addQuoteWindowEditingEvents();
    addLoadMoreEvent();
    document.querySelector(".load-more").click();
    hideOverlay();
});

let quotes = getQuotes(document.location.pathname.split("/").at(-1));

function addLoadMoreEvent() {
    document.querySelector(".load-more").addEventListener("click", (event) => {
        event.preventDefault();
        (async () => {
            let quotesData = await quotes.next();
            if (quotesData.done) {
                removeLoadMoreButton();
                return;
            }
            let quotesContainer = document.querySelector(".quotes-container");
            quotesData.value.forEach(quote => {
                let quoteElement = createQuoteElement(quote);
                quotesContainer.appendChild(quoteElement);
            });
        })();
    });
}

function removeLoadMoreButton() {
    let loadMoreButton = document.querySelector(".load-more");
    loadMoreButton.parentNode.removeChild(loadMoreButton);
}

function addFormSubmitEvent() {
    let form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            (async () => {
                let isValidFormData = checkValidQuoteFormInputs(this);
                if (!isValidFormData) {
                    showMessage(this, "Inputs are invalid!", false);
                    return;
                }
                let formData = parseFormData(this);
                let response = await sendCreateQuoteRequest(formData);
                if (response.success) {
                    showMessage(this, "Quote created successfully!", true);
                    showNewQuote(response.quote);
                    this.elements["reset"].click();
                } else {
                    showMessage(this, "Failed to create quote!", false);
                }
            })();
        });
    }
}

function parseFormData(form) {
    let quoteData = {
        title: form.elements["title"].value,
        content: form.elements["content"].value,
    };
    return quoteData;
}

function showNewQuote(quote) {
    let quotes = document.querySelector(".quotes-container");
    let quoteElement = createQuoteElement(quote);
    quotes.insertBefore(quoteElement, quotes.firstChild);
}

function addQuoteWindowEditingEvents() {
    addQuoteEditingExitEvent();
    addQuoteEditingSubmitEvent();
}

function addQuoteEditingExitEvent() {
    document.querySelector(".quote-editing .exit").addEventListener("click", function (event) {
        event.preventDefault();
        // this.parentNode.parentNode is the quote editing window
        this.parentNode.parentNode.classList.toggle("show");
    });
}

function addQuoteEditingSubmitEvent() {
    document.querySelector(".quote-editing form").addEventListener("submit", function (event) {
        event.preventDefault();
        (async () => {
            let isValidFormData = checkValidQuoteFormInputs(this);
            if (!isValidFormData) {
                showMessage(this, "Inputs are invalid!", false);
                return;
            }
            let formData = parseUpdateFormData(this);
            let response = await sendUpdateQuoteRequest(formData);
            if (response.success) {
                // this.parentNode.parentNode is the quote editing window
                updateQuoteArticle(this.parentNode.parentNode.attributes['data-id'].value, response.quote);
                document.querySelector(".quote-editing .exit").click();
            } else {
                showMessage(this, "Failed to update the quote!", false);
            }
        })();
    });
}

function updateQuoteArticle(quoteId, newQuote) {
    let quoteElement = document.querySelector(`.quote[data-id="${quoteId}"]`);
    let quoteTitle = quoteElement.querySelector(".quote-info .title");
    let content = quoteElement.querySelector(".content p");
    quoteTitle.innerHTML = newQuote.title;
    content.innerHTML = newQuote.content;
}

function parseUpdateFormData(form) {
    let formData = parseFormData(form);
    // form.parentNode.parentNode is the quote editing window
    formData.id = form.parentNode.parentNode.attributes["data-id"].value;
    return formData;
}
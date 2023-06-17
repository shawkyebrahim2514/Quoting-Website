import { createQuoteElement } from "./home-page-quotes.js";

window.addEventListener('load', () => {
    addFormSubmitEvent();
    addQuoteEditingEvents();
});

function addFormSubmitEvent() {
    let form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            let formData = parseFormData(this);
            let isValidFormData = checkValidFormData(formData);
            if (!isValidFormData) {
                showMessage(this, "Inputs are invalid!", false);
                return;
            }
            let response = await sendCreateQuoteRequest(formData);
            if (response.success) {
                showMessage(this, "Quote created successfully!", true);
                showNewQuote(response.quote);
                this.elements["reset"].click();
            } else {
                showMessage(this, "Failed to create quote!", false);
            }
        });
    }
}

function parseFormData(form) {
    let formData = new FormData(form);
    let serializedData = new URLSearchParams(formData).toString();
    return serializedData;
}

function checkValidFormData(formData) {
    let data = formData.split("&");
    let isValid = true;
    for (const element of data) {
        let keyValuePair = element.split("=");
        let value = keyValuePair[1];
        if (value === "") {
            isValid = false;
            break;
        }
    }
    return isValid;
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

function showMessage(form, message, success) {
    if (success) {
        showSuccess(form, message);
        setTimeout(() => {
            showSuccess(form, message);
        }, 3000);
    } else {
        showWarning(form, message);
        setTimeout(() => {
            showWarning(form, message);
        }, 3000);
    }
}

function showWarning(form, warning) {
    // let messages = document.querySelector(".messages");
    let messages = form.previousElementSibling;
    messages.classList.toggle("show");
    let warningMessage = messages.querySelector(".warning-message");
    warningMessage.classList.toggle("show");
    warningMessage.innerHTML = warning;
}

function showSuccess(form, successMessage) {
    // let messages = document.querySelector(".messages");
    let messages = form.previousElementSibling;
    messages.classList.toggle("show");
    let successSection = messages.querySelector(".success-message");
    successSection.classList.toggle("show");
    successSection.innerHTML = successMessage;
}

function showNewQuote(quote) {
    let quotes = document.querySelector(".quotes-container");
    let quoteElement = createQuoteElement(quote);
    quotes.insertBefore(quoteElement, quotes.firstChild);
}

// ------------------------------

function addQuoteEditingEvents() {
    addQuoteEditingSubmitEvent();
    addQuoteEditingExitEvent();
}

function addQuoteEditingSubmitEvent() {
    document.querySelector(".quote-editing form").addEventListener("submit", async function (event) {
        event.preventDefault();
        let formData = parseUpdateFormData(this);
        let isValidFormData = checkValidFormData(formData);
        if (!isValidFormData) {
            showMessage(this, "Inputs are invalid!", false);
            return;
        }
        let response = await sendUpdateQuoteRequest(formData);
        if (response.success) {
            updateQuoteArticle(this.parentNode.attributes['data-id'].value, response.quote);
            document.querySelector(".quote-editing .exit").click();
        } else {
            showMessage(this, "Failed to update the quote!", false);
        }
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
    formData += "&id=" + form.parentNode.attributes["data-id"].value;
    return formData;
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

function addQuoteEditingExitEvent() {
    document.querySelector(".quote-editing .exit").addEventListener("click", function (event) {
        event.preventDefault();
        this.parentNode.classList.toggle("show");
    });
}
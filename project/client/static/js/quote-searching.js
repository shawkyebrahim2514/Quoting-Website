import { sendSearchQuotesRequest, getFullQuoteInfo } from "./quote-requests.js";
import { createQuoteElement } from "./quote-creation.js";


window.addEventListener('load', () => {
    addQuotesSearchEvents();
    addQuotesSearchPopUpCloseEvent();
});

function addQuotesSearchEvents() {
    let searchInput = document.querySelector("form.quote-searching");
    addQuotesSearchSubmitEvent(searchInput);
    addQuotesSearchInputEvent(searchInput);
    addSearchIconClickEvent(searchInput);
}

function addQuotesSearchSubmitEvent(searchInput) {
    searchInput.addEventListener("submit", function (event) {
        event.preventDefault();
        if (this.elements["word-search"].value.length == 0) {
            return;
        }
        (async () => {
            let searchValue = this.elements["word-search"].value.toLowerCase();
            let quotes = await sendSearchQuotesRequest(searchValue);
            if (quotes.length == 0) {
                showEmptyQuotesListMessage();
            } else {
                createQuotesListItems(quotes);
            }
        })();
    });
}

function addQuotesSearchInputEvent(searchInput) {
    searchInput.addEventListener("input", function (event) {
        prepareQuotesList();
    });
}

function showEmptyQuotesListMessage() {
    let quotesList = prepareQuotesList();
    let quoteElement = document.createElement("div");
    quoteElement.innerHTML = `
        <p style="text-align: center; margin: 0;">There is no quote contains this word!</p>
    `;
    quotesList.appendChild(quoteElement);
}

function createQuotesListItems(quotes) {
    let quotesList = prepareQuotesList();
    quotes.forEach(quote => {
        let quoteElement = document.createElement("div");
        quoteElement.className = "item";
        quoteElement.setAttribute("data-id", quote._id);
        quoteElement.innerHTML = `
            <h3>${quote.title}</h3>
            <p>${quote.content}</p>
        `;
        quotesList.appendChild(quoteElement);
        addQuoteClickEvent(quoteElement);
    });
}

function prepareQuotesList() {
    let quotesList = document.querySelector("form.quote-searching .search-items");
    quotesList.innerHTML = "";
    return quotesList;
}

function addQuoteClickEvent(quoteElement) {
    quoteElement.addEventListener("click", function (event) {
        (async () => {
            let quoteId = this.getAttribute("data-id");
            let quoteInfo = await getFullQuoteInfo(quoteId);
            organizeQuoteSearchingPopUp(quoteInfo);
        })();
    });
}

function organizeQuoteSearchingPopUp(quoteInfo) {
    let quoteSeachingPopUp = document.querySelector(".quote-searching-info");
    quoteSeachingPopUp.classList.add("show");
    quoteSeachingPopUp.querySelector(".quotes-container").innerHTML = "";
    quoteSeachingPopUp.querySelector(".quotes-container").appendChild(createQuoteElement(quoteInfo));
    quoteInfo.author.bio = quoteInfo.author.bio.replace(/\n/g, "<br>");
    quoteSeachingPopUp.querySelector(".creator").innerHTML = `
        <h2>${quoteInfo.author.first_name} ${quoteInfo.author.last_name}</h2>
        <a href="/profile/${quoteInfo.author.username}" class="profile-link">@${quoteInfo.author.username}</a>
        <div class="bio">${quoteInfo.author.bio}</div>
    `
}

function addQuotesSearchPopUpCloseEvent() {
    let quoteSeachingPopUp = document.querySelector(".quote-searching-info");
    quoteSeachingPopUp.querySelector(".exit").addEventListener("click", function (event) {
        quoteSeachingPopUp.classList.remove("show");
    });
}

function addSearchIconClickEvent(searchInput) {
    let searchIcon = searchInput.querySelector("form.quote-searching .search-icon");
    searchIcon.addEventListener("click", function (event) {
        searchInput.dispatchEvent(new Event("submit"));
    });
}
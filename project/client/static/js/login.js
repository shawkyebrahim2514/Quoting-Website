import * as main from "./main.js";

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    let response = await sendLoginRequest(this);
    if (response.success) {
        window.location.href = "./";
    } else {
        showWarning(response.message);
    }
});

async function sendLoginRequest(form) {
    let formData = new FormData(form);
    let serializedData = new URLSearchParams(formData).toString();
    const response = await (await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: serializedData,
    })).json();
    return response;
}

function showWarning(warning) {
    let messages = document.querySelector(".messages");
    messages.classList.add("show");
    let warningMessage = messages.querySelector(".warning-message");
    warningMessage.classList.add("show");
    warningMessage.innerHTML = warning;
}
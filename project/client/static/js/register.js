import * as main from "./main.js";

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    if (checkMatchedPasswords(this)) {
        let response = await sendRequest(this);
        if (response.success) {
            window.location.href = "./";
        } else {
            showWarning(response.message);
        }
    } else {
        showWarning("Passwords do not match");
    }
});

function checkMatchedPasswords(form) {
    let password = form.elements['password'].value;
    let confirmPassword = form.elements['confirm-password'].value;
    return (password === confirmPassword);
}

async function sendRequest(form) {
    let formData = new FormData(form);
    let serializedData = new URLSearchParams(formData).toString();
    const response = await (await fetch('/register', {
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
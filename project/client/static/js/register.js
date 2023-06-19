import { hideOverlay, addToggleNavbarLinks } from "./main.js";
import { sendRegisterationRequest } from "./user-requests.js";
import { checkValidRegistrationInputs } from "./form-validations.js";
import { showMessage } from "./messages.js";

window.addEventListener('load', () => {
    addFormSubmitEvent();
    addToggleNavbarLinks();
    hideOverlay();
});

function addFormSubmitEvent() {
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault();
        if (!checkValidRegistrationInputs(this)) {
            showMessage(this, "Invalid inputs", false);
            window.scrollTo(0, 0);
            return;
        }
        if (checkMatchedPasswords(this)) {
            let response = await sendRegisterationRequest(this);
            if (response.success) {
                window.location.href = "./";
            } else {
                showMessage(this, response.message, false);
            }
        } else {
            showMessage(this, "Passwords do not match", false);
        }
    });
}

function checkMatchedPasswords(form) {
    let password = form.elements['password'].value;
    let confirmPassword = form.elements['confirm-password'].value;
    return (password === confirmPassword);
}
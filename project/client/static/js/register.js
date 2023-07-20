import { hideOverlay, addToggleNavbarLinks } from "./main.js";
import { sendRegisterationRequest } from "./user-requests.js";
import { checkValidRegistrationInputs, checkValidationFieldsResult } from "./form-validations.js";
import { showMessage } from "./messages.js";

window.addEventListener('load', () => {
    addFormSubmitEvent();
    addToggleNavbarLinks();
    hideOverlay();
});

function addFormSubmitEvent() {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        (async () => {
            let fields = checkValidRegistrationInputs(this);
            fields["confirm-password"] = checkMatchedPasswords(this);
            let isValidFields = checkValidationFieldsResult(this, fields);
            if (!isValidFields) {
                showMessage(this, "Invalid inputs", false);
                window.scrollTo(0, 0);
                return;
            }
            let response = await sendRegisterationRequest(this);
            if (response.success) {
                window.location.href = "./";
            } else {
                showMessage(this, response.message, false);
                window.scrollTo(0, 0);
            }
        })();
    });
}

function checkMatchedPasswords(form) {
    let password = form.elements['password'].value;
    let confirmPassword = form.elements['confirm-password'].value;
    return (password === confirmPassword);
}
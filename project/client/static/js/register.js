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
            let formData = parseFormData(this);
            let response = await sendRegisterationRequest(formData);
            if (response.success) {
                window.location.href = "./";
            } else {
                showMessage(this, response.message, false);
                window.scrollTo(0, 0);
            }
        })();
    });
}

function parseFormData(form) {
    let formData = {
        first_name: form.elements['first-name'].value,
        last_name: form.elements['last-name'].value,
        username: form.elements['username'].value,
        email: form.elements['email'].value,
        password: form.elements['password'].value,
        bio: form.elements['bio'].value,
    }
    return formData;
}

function checkMatchedPasswords(form) {
    let password = form.elements['password'].value;
    let confirmPassword = form.elements['confirm-password'].value;
    return (password === confirmPassword);
}
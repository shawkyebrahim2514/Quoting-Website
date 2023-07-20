import { hideOverlay, addToggleNavbarLinks } from "./main.js";
import { checkValidProfileSettingsForm, checkValidationFieldsResult } from "./form-validations.js";
import { sendUpdatingRequest } from "./user-requests.js";
import { showMessage } from "./messages.js";

window.addEventListener('load', () => {
    addToggleNavbarLinks();
    addFormSubmitEvent();
    hideOverlay();
});

function addFormSubmitEvent() {
    let form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        (async () => {
            let fields = checkValidProfileSettingsForm(this);
            let isValidFields = checkValidationFieldsResult(this, fields);
            if (!isValidFields) {
                showMessage(this, "Invalid inputs", false);
                window.scrollTo(0, 0);
                return;
            }
            let formData = parseFormData(this);
            let response = await sendUpdatingRequest(formData);
            if (response.success) {
                showMessage(this, response.message, true);
            } else {
                showMessage(this, response.message, false);
            }
            window.scrollTo(0, 0);
        })();
    });
}

function parseFormData(form) {
    let username = form.elements["username"].value;
    let first_name = form.elements["first-name"].value;
    let last_name = form.elements["last-name"].value;
    let bio = form.elements["bio"].value;
    let oldPassword = form.elements["old-password"].value;
    let newPassword = form.elements["new-password"].value;
    return {
        username,
        first_name,
        last_name,
        bio,
        oldPassword,
        newPassword,
    };
}
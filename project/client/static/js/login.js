import { hideOverlay, addToggleNavbarLinks } from "./main.js";
import { sendLoginRequest } from "./user-requests.js";
import { checkValidLoginInputs, checkValidationFieldsResult } from "./form-validations.js";
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
            let fields = checkValidLoginInputs(this);
            let isValidFields = checkValidationFieldsResult(this, fields);
            if (!isValidFields) {
                showMessage(this, "Invalid inputs", false);
                window.scrollTo(0, 0);
                return;
            }
            let response = await sendLoginRequest(this);
            if (response.success) {
                window.location.href = "./";
            } else {
                showMessage(this, response.message, false);
                window.scrollTo(0, 0);
            }
        })();
    });
}
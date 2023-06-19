import { hideOverlay, addToggleNavbarLinks } from "./main.js";
import { sendLoginRequest } from "./user-requests.js";
import { checkValidLoginInputs } from "./form-validations.js";
import { showMessage } from "./messages.js";

window.addEventListener('load', () => {
    addFormSubmitEvent();
    addToggleNavbarLinks();
    hideOverlay();
});

function addFormSubmitEvent() {
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault();
        if(!checkValidLoginInputs(this)) {
            showMessage(this, "Invalid inputs", false);
            return;
        }
        let response = await sendLoginRequest(this);
        if (response.success) {
            window.location.href = "./";
        } else {
            showMessage(this, response.message, false);
        }
    });
}
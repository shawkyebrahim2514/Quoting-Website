import { sendLogoutRequest } from "./user-requests.js";

window.addEventListener('load', () => {
    addLogoutEvent();
});

function addLogoutEvent() {
    let logoutButton = document.querySelector(".logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", async function (event) {
            event.preventDefault();
            let response = await sendLogoutRequest();
            if (response.success) {
                location.href = "/login";
            }
        });
    }
}
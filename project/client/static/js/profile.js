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

async function sendLogoutRequest() {
    const response = await (await fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })).json();
    if (response.success) {
        location.href = "/login";
    }
    return response;
}
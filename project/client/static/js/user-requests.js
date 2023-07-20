import User from "../graphql/User.js";

async function sendRegisterationRequest(form) {
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

async function sendUpdatingRequest(formData) {
    const response = await User.updateUser(formData);
    return response;
}

export { 
    sendRegisterationRequest, 
    sendLoginRequest, 
    sendLogoutRequest,
    sendUpdatingRequest,
}
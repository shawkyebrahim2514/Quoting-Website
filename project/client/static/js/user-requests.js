import User from "../graphql/User.js";

async function sendRegisterationRequest(formData) {
    const response = await (await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })).json();
    return response;
}

async function sendLoginRequest(formData) {
    const response = await (await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
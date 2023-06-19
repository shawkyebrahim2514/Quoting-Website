function checkValidRegistrationInputs(form) {
    let username = form.elements['username'].value;
    let password = form.elements['password'].value;
    let email = form.elements['email'].value;
    let firstName = form.elements['first-name'].value;
    let lastName = form.elements['last-name'].value;
    return (checkValidUsername(username)
        && checkValidPassword(password)
        && checkValidEmail(email)
        && checkValidName(firstName)
        && checkValidName(lastName));
}

function checkValidUsername(username) {
    // Username must be between 5 and 20 characters long
    // Username must contain only letters and numbers
    let usernameRegex = /^[a-zA-Z0-9]{5,20}$/;
    return usernameRegex.test(username);
}

function checkValidPassword(password) {
    // Password must be between 6 and 20 characters long
    // Password must contain at least one uppercase letter, one lowercase letter, one special character and one number
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+]).{6,20}$/;
    return passwordRegex.test(password);
}

function checkValidEmail(email) {
    // Email must be valid
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function checkValidName(name) {
    // Name must be between 2 and 20 characters long
    // Name must contain only letters
    let nameRegex = /^[a-zA-Z]{2,20}$/;
    return nameRegex.test(name);
}

function checkValidLoginInputs(form) {
    let username = form.elements['username'].value;
    let password = form.elements['password'].value;
    return (checkValidUsername(username) && checkValidPassword(password));
}

function checkValidQuoteFormInputs(form) {
    let title = form.elements["title"].value;
    let content = form.elements["content"].value;
    if (title.length < 3 || title.length > 255) {
        return false;
    }
    if (content.length < 10 || content.length > 1000) {
        return false;
    }
    return true;
}

export { checkValidRegistrationInputs, checkValidLoginInputs, checkValidQuoteFormInputs }
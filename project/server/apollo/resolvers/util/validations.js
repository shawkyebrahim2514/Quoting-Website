function checkUserInputValidation(user) {
    let message = "";
    message += checkValidUsername(user.username);
    message += checkValidPassword(user.password);
    message += checkValidEmail(user.email);
    message += checkValidName(user.first_name);
    message += checkValidName(user.last_name);
    if(message === "") {
        return {valid: true, message: "Valid user"};
    } else {
        return {valid: false, message: message};
    }
}

function checkValidUsername(username) {
    // Username must be between 5 and 20 characters long
    // Username must contain only letters and numbers
    let usernameRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (usernameRegex.test(username)) {
        return '';
    } else {
        return 'Username must be between 5 and 20 characters long and contain only letters and numbers\n';
    }
}

function checkValidPassword(password) {
    // Password must be between 6 and 20 characters long
    // Password must contain at least one uppercase letter, one lowercase letter, one special character and one number
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+]).{6,20}$/;
    if (passwordRegex.test(password)) {
        return '';
    } else {
        return 'Password must be between 6 and 20 characters long and contain at least one uppercase letter, ' +
                'one lowercase letter, one special character and one number\n';
    }
}

function checkValidEmail(email) {
    // Email must be valid
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return '';
    } else {
        return 'Email must be valid\n';
    }
}

function checkValidName(name) {
    // Name must be between 2 and 20 characters long
    // Name must contain only letters
    let nameRegex = /^[a-zA-Z]{2,20}$/;
    if (nameRegex.test(name)) {
        return '';
    } else {
        return 'Name must be between 2 and 20 characters long and contain only letters\n';
    }
}

function checkQuoteInputValidation(quote) {
    let title = quote.title;
    let content = quote.content;
    let message = "";
    if (title.length < 3 || title.length > 255) {
        message += 'Title must be between 3 and 255 characters long\n';
    }
    if (content.length < 10 || content.length > 1000) {
        message += 'Content must be between 10 and 1000 characters long\n';
    }
    if(message === "") {
        return {valid: true, message: "Valid quote"};
    } else {
        return {valid: false, message: message};
    }
}

module.exports = { checkUserInputValidation, checkQuoteInputValidation };
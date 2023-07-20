function checkValidationFieldsResult(form, fields) {
    let isValidFields = true;
    for (const [id, value] of Object.entries(fields)) {
        if (!value) {
            isValidFields = false;
            form.elements[id].classList.add("invalid");
            form.elements[id].previousElementSibling.classList.add("invalid");
            form.elements[id].nextElementSibling.classList.add("invalid");
        } else {
            form.elements[id].classList.remove("invalid");
            form.elements[id].previousElementSibling.classList.remove("invalid");
            form.elements[id].nextElementSibling.classList.remove("invalid");
        }
    }
    return isValidFields;
}

function checkValidRegistrationInputs(form) {
    let username = form.elements['username'].value;
    let password = form.elements['password'].value;
    let email = form.elements['email'].value;
    let firstName = form.elements['first-name'].value;
    let lastName = form.elements['last-name'].value;
    let bio = form.elements['bio'].value;
    let fields = {
        "username": checkValidUsername(username),
        "password": checkValidPassword(password),
        "email": checkValidEmail(email),
        "first-name": checkValidName(firstName),
        "last-name": checkValidName(lastName),
        "bio": checkValidBio(bio)
    }
    return fields;
}

function checkValidUsername(username) {
    // Username must be between 1 and 20 characters long
    // Username must contain only letters and numbers
    let usernameRegex = /^[a-zA-Z0-9]{1,20}$/;
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
    if (email.length > 50) {
        return false;
    }
    let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email);
}

function checkValidName(name) {
    // Name must be between 2 and 20 characters long
    // Name must contain only letters
    let nameRegex = /^[a-zA-Z]{2,20}$/;
    return nameRegex.test(name);
}

function checkValidBio(bio) {
    // Bio must with max 150 characters
    let bioRegex = /^.{0,150}$/s;
    return bioRegex.test(bio);
}

function checkValidLoginInputs(form) {
    let username = form.elements['username'].value;
    let password = form.elements['password'].value;
    let fields = {
        "username": checkValidUsername(username),
        "password": checkValidPassword(password),
    }
    return fields;
}

function checkValidQuoteFormInputs(form) {
    let title = form.elements["title"].value;
    let content = form.elements["content"].value;
    let fields = {
        "title": checkValidTitle(title),
        "content": checkValidContent(content),
    };
    return fields;
}

function checkValidTitle(title) {
    // Title must be between 3 and 50 characters long
    let titleRegex = /^.{3,50}$/s;
    return titleRegex.test(title);
}

function checkValidContent(content) {
    // Content must be between 10 and 400 characters long
    let contentRegex = /^.{10,400}$/s;
    return contentRegex.test(content);
}

function checkValidProfileSettingsForm(form) {
    let firstName = form.elements["first-name"].value;
    let lastName = form.elements["last-name"].value;
    let bio = form.elements["bio"].value;
    let oldPassword = form.elements["old-password"].value;
    let newPassword = form.elements["new-password"].value;
    let reNewPassword = form.elements["re-new-password"].value;
    let fields = {
        "first-name": checkValidName(firstName),
        "last-name": checkValidName(lastName),
        "bio": checkValidBio(bio)
    };
    // if (!oldPassword && (newPassword || reNewPassword)) {
    //     return "You must enter your current password to change it.";
    // }
    // if (oldPassword && (!newPassword || !reNewPassword)) {
    //     return "You must enter your new password twice to change it.";
    // }
    // if (oldPassword && newPassword && reNewPassword) {
    //     if (!checkValidPassword(oldPassword) || !checkValidPassword(newPassword) || !checkValidPassword(reNewPassword)) {
    //         return "Invalid password format.";
    //     }
    //     if (newPassword !== reNewPassword) {
    //         return "New passwords do not match.";
    //     }
    // }
    // if (!checkValidName(firstName) || !checkValidName(lastName) || !checkValidBio(bio)) {
    //     return "Invalid data format.";
    // }
    if (oldPassword || newPassword || reNewPassword) {
        fields["old-password"] = checkValidPassword(oldPassword);
        fields["new-password"] = checkValidPassword(newPassword);
        fields["re-new-password"] = checkValidPassword(reNewPassword);
    } else {
        fields["old-password"] = true;
        fields["new-password"] = true;
        fields["re-new-password"] = true;
    }
    console.log(fields);
    return fields;
}

export {
    checkValidationFieldsResult,
    checkValidRegistrationInputs,
    checkValidLoginInputs,
    checkValidQuoteFormInputs,
    checkValidProfileSettingsForm
}
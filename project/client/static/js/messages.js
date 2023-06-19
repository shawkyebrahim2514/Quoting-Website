function showMessage(form, message, success) {
    if (success) {
        showSuccess(form, message);
        setTimeout(() => {
            showSuccess(form, message);
        }, 3000);
    } else {
        showWarning(form, message);
        setTimeout(() => {
            showWarning(form, message);
        }, 3000);
    }
}

function showWarning(form, warning) {
    let messages = form.previousElementSibling;
    messages.classList.toggle("show");
    let warningMessage = messages.querySelector(".warning-message");
    warningMessage.classList.toggle("show");
    warningMessage.innerHTML = warning;
}

function showSuccess(form, successMessage) {
    let messages = form.previousElementSibling;
    messages.classList.toggle("show");
    let successSection = messages.querySelector(".success-message");
    successSection.classList.toggle("show");
    successSection.innerHTML = successMessage;
}

export { showMessage }
const bcrypt = require("bcryptjs");

function organizeSearchQuotes(quotes) {
    quotes.forEach(quote => {
        convertQuoteId(quote);
    });
}

function organizeQuotes(quotes) {
    quotes.forEach(quote => {
        convertQuoteId(quote);
        convertQueryDate(quote);
    });
}

function convertQuoteId(quote) {
    quote._id = quote._id.toString();
}

function convertQueryDate(quote) {
    quote.created_at = convertSecondsToDuration(quote.created_at);
}

function convertSecondsToDuration(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    if (years) return years + ' year' + (years > 1 ? 's' : '');
    if (weeks) return weeks + ' week' + (weeks > 1 ? 's' : '');
    if (days) return days + ' day' + (days > 1 ? 's' : '');
    if (hours) return hours + ' hour' + (hours > 1 ? 's' : '');
    if (minutes) return minutes + ' minute' + (minutes > 1 ? 's' : '');
    return seconds + ' second' + (seconds > 1 ? 's' : '');
}

function checkValidPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    organizeQuotes,
    organizeSearchQuotes,
    checkValidPassword,
    hashPassword
};
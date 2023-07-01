const bcrypt = require("bcryptjs");

function convertSecondsToDuration(seconds) {
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


function convertQueriesDate(queries) {
    queries.forEach(query => {
        query.created_at = convertSecondsToDuration(query.created_at);
    });
}

function convertQueryDate(query) {
    query.created_at = convertSecondsToDuration(query.created_at);
}

function checkValidPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

function hashUserPassword(user) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
}

module.exports = { convertQueriesDate, convertQueryDate, checkValidPassword, hashUserPassword };
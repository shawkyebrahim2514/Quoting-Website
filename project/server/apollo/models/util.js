function convertSecondsToDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    if (years) return years + ' years';
    if (weeks) return weeks + ' weeks';
    if (days) return days + ' days';
    if (hours) return hours + ' hours';
    if (minutes) return minutes + ' minutes';
    return seconds + ' seconds';
}


function convertQueriesDate(queries) {
    queries.forEach(query => {
        query.created_at = convertSecondsToDuration(query.created_at);
    });
}

function convertQueryDate(query) {
    query.created_at = convertSecondsToDuration(query.created_at);
}

module.exports = { convertQueriesDate, convertQueryDate };
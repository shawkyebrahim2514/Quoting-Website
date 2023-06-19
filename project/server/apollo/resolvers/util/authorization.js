function validateSession(req) {
    const sessionId = req.headers.authorization;
    const user = validateSessionId(req, sessionId);
    const username = user ? user.username : null;
    return username;
}

function validateSessionId(req, sessionId) {
    let sessionStore = req.sessionStore;
    let session = sessionStore.sessions[sessionId];
    if (session) {
        return (JSON.parse(session)).user;
    } else {
        return null;
    }
}

module.exports = {validateSession}
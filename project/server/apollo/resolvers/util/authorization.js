function validateSession(req) {
    const sessionId = req.headers.authorization;
    const username = validateSessionId(req, sessionId);
    return username;
}

function validateSessionId(req, sessionId) {
    let sessionStore = req.sessionStore;
    let session = sessionStore.sessions[sessionId];
    if (session) {
        return JSON.parse(session).username;
    } else {
        return null;
    }
}

module.exports = {validateSession}
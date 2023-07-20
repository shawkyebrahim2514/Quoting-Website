function attachJWTToAuthorizationHeader(req, res, next) {
    if (!req.headers.cookie) {
        return next();
    }
    const token = separateTokenFromCookie(req.headers.cookie);
    if (token) {
        req.headers.authorization = `${token}`;
    }
    next();
}

function separateTokenFromCookie(cookie) {
    // All cookies are separated by `;`
    const cookiesElements = cookie.split(';');
    // This is where the JWT token is stored
    const keyValueToken = cookiesElements.find((element) => element.includes('token'));
    if (!keyValueToken) {
        return null;
    }
    // JWT token in the cookie in the format: token=<token>
    const token = keyValueToken.split('=')[1];
    return token;
}

module.exports = { attachJWTToAuthorizationHeader };
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
    const cookiesElements = cookie.split(';');
    const keyValueToken = cookiesElements.find((element) => element.includes('token'));
    if (!keyValueToken) {
        return null;
    }
    const token = keyValueToken.split('=')[1];
    return token;
}

module.exports = { attachJWTToAuthorizationHeader };
function attachJWTToAuthorizationHeader(req, res, next) {
    if (!req?.cookies?.token) {
        return next();
    }
    req.headers.authorization = `${req.cookies.token}`;
    next();
}

module.exports = { attachJWTToAuthorizationHeader };
const jwt = require('jsonwebtoken');

function checkUserLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    // If the headers doesn't contain the JWT token in the `Authorization` header
    if (!token) {
        return res.status(401).redirect('/login');
    }
    const decoded = decodeJWT(token);
    // If the JWT token is invalid
    if (!decoded) {
        return res.status(401).redirect('/login');
    }
    next();
}

function checkUserLoggedOut(req, res, next) {
    const token = req.headers.authorization;
    // If the headers doesn't contain the JWT token in the `Authorization` header
    if (!token) {
        return next();
    }
    const decoded = decodeJWT(token);
    // If the JWT token is invalid
    if (!decoded) {
        return next();
    }
    res.redirect('/');
}

function createJWTTokenInCookie(user, res) {
    const token = createJWTToken(user);
    // Store the JWT token in the cookies, JWT is stored with `token` key
    // The token will be expired after 1 hour
    // The encode is string to prevent the encoded the space character between `Bearer` and the token
    // The secure option is disabled because the server is running on HTTP at the development environment
    //      Turn on the secure option when the server is running on HTTPS at the production environment
    res.cookie('token', `Bearer ${token}`, { httpOnly: true, secure: true, maxAge: 3600000, encode: String });
}

function clearJWTCookie(res) {
    // Clear the JWT token from the cookies, JWT is stored with `token` key
    // The secure option is disabled because the server is running on HTTP at the development environment
    //      Turn on the secure option when the server is running on HTTPS at the production environment
    res.clearCookie('token', { httpOnly: true, secure: true, });
}

function createJWTToken(user) {
    const payload = {
        username: user.username
    };
    // The JWT token will be expired after 1 hour
    // The JWT token is signed with the JWT_SECRET environment variable
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

function decodeJWT(authHeader) {
    if (!authHeader) return false;
    // The authorization header is in the format of `Bearer <token>`
    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            return false;
        }
    }
    return false;
}

module.exports = {
    checkUserLoggedIn,
    checkUserLoggedOut,
    createJWTTokenInCookie,
    clearJWTCookie,
    decodeJWT
};
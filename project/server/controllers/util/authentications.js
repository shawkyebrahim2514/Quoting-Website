const jwt = require('jsonwebtoken');

function checkUserLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).redirect('/register');
        // return res.redirect('/register');
    }
    const decoded = decodeJWT(token);
    if (!decoded) {
        return res.redirect('/register');
    }
    next();
}

function checkUserUnloggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return next();
    }
    const decoded = decodeJWT(token);
    if (!decoded) {
        return next();
    }
    res.redirect('/');
}

function createJWTToken(user) {
    const payload = { username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

function decodeJWT(authHeader) {
    if (!authHeader) return false;
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

module.exports = { checkUserLoggedIn, checkUserUnloggedIn, createJWTToken, decodeJWT };
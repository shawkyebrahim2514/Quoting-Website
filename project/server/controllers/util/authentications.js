function checkUserLoggedIn(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/register');
}

function checkUserUnloggedIn(req, res, next) {
    if (!req.session.user) {
        return next();
    }
    res.redirect('/profile');
}

function createUserSession(req, user) {
    req.session.user = {
        username: user.username,
    };
    req.session.save();
}

module.exports = { checkUserLoggedIn, checkUserUnloggedIn, createUserSession };
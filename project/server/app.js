const express = require("express");
const { homePageController } = require("./controllers/home-page");
const { profileController } = require("./controllers/profile");
const { registerController } = require("./controllers/register");
const { loginController } = require("./controllers/login");
const router = express.Router();

router.use("/", homePageController);

router.use("/register", registerController);

router.use("/login", loginController);

router.use("/profile", profileController);

router.use('/', (req, res, next) => {
    if (req.path === '/graphql') {
        return next();
    } else {
        res.render('404', { authenticated: req.session.user.username });
    }
});

module.exports = { appRouters: router };
const express = require("express");
const { homePageController } = require("./controllers/home-page");
const { profileController } = require("./controllers/profile");
const { registerController } = require("./controllers/register");
const { loginController } = require("./controllers/login");
const { attachJWTToAuthorizationHeader } = require("./controllers/util/middlewares");
const { decodeJWT } = require("./controllers/util/authentications");
const router = express.Router();

router.use(attachJWTToAuthorizationHeader);

// Home page get controller and logout
router.use("/", homePageController);

router.use("/register", registerController);

router.use("/login", loginController);

router.use("/profile", profileController);

router.use('/', (req, res, next) => {
    if (req.path === '/graphql/') {
        return next();
    } else {
        const decodedToken = decodeJWT(req.headers.authorization);
        res.render('404', { authenticated: decodedToken.username });
    }
});

module.exports = { appRouters: router };
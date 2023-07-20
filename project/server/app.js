const express = require("express");
const { mainController } = require("./controllers/main");
const { profileController } = require("./controllers/profile");
const { registerController } = require("./controllers/register");
const { loginController } = require("./controllers/login");
const { attachJWTToAuthorizationHeader } = require("./controllers/util/middlewares");
const { decodeJWT } = require("./controllers/util/authentications");
const router = express.Router();

router.use(attachJWTToAuthorizationHeader);

// Main controller contains get home page controller, get settings page controller, and post logout controller
router.use("/", mainController);

// Register controller contains get and post controllers that serve the registration page
router.use("/register", registerController);

// Login controller contains get and post controllers that serve the login page
router.use("/login", loginController);

// Profile controller contains get controller of a specific user's profile page
router.use("/profile", profileController);

// 404 controller
router.use('/', (req, res, next) => {
    // If the request path is '/graphql/', then it will be handled by the GraphQL server
    if (req.path === '/graphql/') {
        return next();
    } else {
        // Check the validation of the JWT token
        const decodedToken = decodeJWT(req.headers.authorization);
        // authenticated is an object that used in the navbar of this page
        res.render('404', { authenticated: decodedToken.username });
    }
});

module.exports = { appRouters: router };
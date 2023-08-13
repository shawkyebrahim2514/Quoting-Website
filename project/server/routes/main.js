const router = require("express").Router();
const { checkUserLoggedIn } = require("../controllers/util/authentications.js");
const {
    getHomePage,
    getSettingsPage,
    postLogout
} = require("../controllers/main.js");

router.get("/", getHomePage);

// User who want to visit this page must be logged in
router.get("/settings", checkUserLoggedIn, getSettingsPage);

// User who want to logout must be logged in
router.post("/logout", checkUserLoggedIn, postLogout);

module.exports = { mainRouter: router };
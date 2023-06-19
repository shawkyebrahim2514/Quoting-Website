const express = require("express");
const router = express.Router();
const { checkUserLoggedIn } = require("./util/authentications.js");
const { quoteController } = require("./quote.js");

router.get("/", (req, res) => {
    res.render("home-page", { authenticated: req.session.user ? req.session.user.username : null });
});

router.post("/logout", checkUserLoggedIn, (req, res) => {
    try {
        req.session.destroy();
        res.json({ success: true, message: "Logout successful!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Logout failed!" });
    }
});

// Route to handle all quote related requests
router.use("/", quoteController);

module.exports = { homePageController: router };
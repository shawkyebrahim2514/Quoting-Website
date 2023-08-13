const User = require("./graphql/User");
const { createJWTTokenInCookie } = require("./util/authentications.js");

const getRegistrationPage = (req, res) => {
    // There isn't any authenticated object because the user who can visit this page is not logged in
    res.render("register");
};

const postRegistration = (req, res) => {
    (async () => {
        try {
            let user = parseRegisterRequestBody(req);
            // Send this request to the GraphQL server
            let response = await User.createUser(user);
            if (response.success) {
                createJWTTokenInCookie(user, res);
                res.json({ success: true, message: 'Registration successful' });
            } else {
                res.status(401).json({ success: false, message: 'User Exists before!' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    })();
};

function parseRegisterRequestBody(req) {
    let user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio
    };
    return user;
}

module.exports = {
    getRegistrationPage,
    postRegistration
};
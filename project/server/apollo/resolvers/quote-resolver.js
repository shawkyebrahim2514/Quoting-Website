const User = require("../models/User");

const quoteResolver = {
  Quote: {
    author: async ({ username }, args, context) => {
      try {
        let user = await User.getUser(username);
        return user;
      } catch (error) {
        return null;
      }
    },
  },
};

module.exports = quoteResolver;

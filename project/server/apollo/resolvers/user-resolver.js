const Quote = require("../models/Quote");

const userResolver = {
  User: {
    quotes: async ({ username }, { offset, loggedInUser }, context) => {
      try {
        let quotes = await Quote.getAllQuotesByUsername({ username, offset, loggedInUser });
        return quotes;
      } catch (error) {
        return [];
      }
    },
  },
};

module.exports = userResolver;

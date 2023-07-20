const User = require("../models/User");
const Quote = require("../models/Quote");
const { decodeJWT } = require("../../controllers/util/authentications");

const queryResolver = {
  Query: {
    userAuthentication: async (parent, { username, password }, context) => {
      try {
        let {message, user} = await User.checkUserAuthentication(username, password);
        return { success: true, message, user };
      } catch (error) {
        return { success: false, message: error.message, user: null };
      }
    },
    users: async (parent, args, context) => {
      try {
        let users = await User.getAllUsers();
        return users;
      } catch (error) {
        return [];
      }
    },
    user: async (parent, { username }, context) => {
      try {
        let user = await User.getUser(username);
        return user;
      } catch (error) {
        return null;
      }
    },
    quotes: async (parent, { loggedInUser, username, offset }, context) => {
      // The loggedInUser will be used in the Quote model.
      if (!loggedInUser) {
        // Try to take the logged in user from authorization header if it's not provided
        const token = context.req.headers.authorization;
        loggedInUser = decodeJWT(token).username;
      }
      try {
        let quotes;
        if (username) {
          quotes = await Quote.getAllQuotesByUsername({ username, offset, loggedInUser });
        } else {
          quotes = await Quote.getAllQuotes({ offset, loggedInUser });
        }
        return quotes;
      } catch (error) {
        return [];
      }
    },
    quote: async (parent, { id, loggedInUser }, context) => {
      // The loggedInUser will be used in the Quote model.
      if (!loggedInUser) {
        const token = context.req.headers.authorization;
        // Try to take the logged in user from authorization header if it's not provided
        loggedInUser = decodeJWT(token).username;
      }
      try {
        let quote = await Quote.getQuote({ id, loggedInUser });
        return quote;
      } catch (error) {
        return null;
      }
    },
    quotesSearch: async (parent, { word }, context) => {
      try {
        let quotes = await Quote.searchQuotes(word);
        return quotes;
      } catch (error) {
        return [];
      }
    },
  },
};

module.exports = queryResolver;

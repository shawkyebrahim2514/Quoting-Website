const User = require("../models/User");
const Quote = require("../models/Quote");
const { validateSession } = require("./util/authorization");

const queryResolver = {
  Query: {
    userAuthentication: async (parent, { username, password }, context) => {
      try {
        let message = await User.checkUserAuthentication(username, password);
        return { success: true, message: message };
      } catch (error) {
        return { success: false, message: error };
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
      if (!loggedInUser) {
        loggedInUser = validateSession(context.req);
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
      if (!loggedInUser) {
        loggedInUser = validateSession(context.req);
      }
      try {
        let quote = await Quote.getQuote({ id, loggedInUser });
        return quote;
      } catch (error) {
        return null;
      }
    },
  },
};

module.exports = queryResolver;

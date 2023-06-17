const User = require("../models/User");
const Quote = require("../models/Quote");
const { validateSession } = require("./util/authorization");

const mutationResolver = {
    Mutation: {
        createUser: async (_, { input }, context) => {
            try {
                let message = await User.createUser(input);
                return { success: true, message: message };
            } catch (error) {
                return { success: false, message: error };
            }
        },
        createQuote: async (_, { input }, context) => {
            const username = validateSession(context.req);
            if (!username) {
                return { success: false, message: "Unauthorized operation!", quote: null };
            }
            try {
                let lastInsertedId = await Quote.createQuote({ quoteData: input, username });
                let quote = await Quote.getQuote({ id: lastInsertedId, loggedInUser: username });
                return { success: true, message: "Successfully created!", quote: quote };
            } catch (error) {
                return { success: false, message: error, quote: null };
            }
        },
        likeQuote: async (_, { quote_id }, context) => {
            const username = validateSession(context.req);
            if (!username) {
                return { success: false, message: "Unauthorized operation!" };
            }
            try {
                let message = await Quote.likeQuote({ quote_id, username });
                return { success: true, message: message };
            } catch (error) {
                return { success: false, message: error };
            }
        },
        dislikeQuote: async (_, { quote_id }, context) => {
            const username = validateSession(context.req);
            if (!username) {
                return { success: false, message: "Unauthorized operation!" };
            }
            try {
                let message = await Quote.dislikeQuote({ quote_id, username });
                return { success: true, message: message };
            } catch (error) {
                return { success: false, message: error };
            }
        },
        deleteQuote: async (_, { quote_id }, context) => {
            const username = validateSession(context.req);
            if (!username) {
                return { success: false, message: "Unauthorized operation!" };
            }
            try {
                let message = await Quote.deleteQuote({ quote_id, username });
                return { success: true, message: message };
            } catch (error) {
                return { success: false, message: error };
            }
        },
        updateQuote: async (_, { input }, context) => {
            const username = validateSession(context.req);
            if (!username) {
                return { success: false, message: "Unauthorized operation!", quote: null };
            }
            try {
                await Quote.updateQuote({ quoteData: input, username });
                let quote = await Quote.getQuote({ id: input.id, loggedInUser: username });
                return { success: true, message: "Successfully updating!", quote: quote };
            } catch (error) {
                return { success: false, message: error, quote: null };
            }
        },
    },
};

module.exports = mutationResolver;
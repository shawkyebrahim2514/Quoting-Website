const User = require("../models/User");
const Quote = require("../models/Quote");
const { checkUserInputValidation, checkQuoteInputValidation } = require("./util/validations");
const { decodeJWT } = require("../../controllers/util/authentications");

const mutationResolver = {
    Mutation: {
        createUser: async (_, { input }, context) => {
            let userValidation = checkUserInputValidation(input);
            if (!userValidation.valid) {
                return { success: false, message: userValidation.message };
            }
            try {
                let message = await User.createUser(input);
                return { success: true, message: message };
            } catch (error) {
                return { success: false, message: error };
            }
        },
        createQuote: async (_, { input }, context) => {
            const token = context.req.headers.authorization;
            if(!token) {
                return { success: false, message: "Authorization token required!", quote: null };
            }
            const username = decodeJWT(token).username;
            if (!username) {
                return { success: false, message: "Unauthorized operation!", quote: null };
            }
            let quoteValidation = checkQuoteInputValidation(input);
            if (!quoteValidation.valid) {
                return { success: false, message: quoteValidation.message, quote: null };
            }
            try {
                let newCreatedQuote = await Quote.createQuote({ quoteData: input, username });
                return { success: true, message: "Successfully created!", quote: newCreatedQuote };
            } catch (error) {
                return { success: false, message: error, quote: null };
            }
        },
        likeQuote: async (_, { quote_id }, context) => {
            const token = context.req.headers.authorization;
            if(!token) {
                return { success: false, message: "Authorization token required!", quote: null };
            }
            const username = decodeJWT(token).username;
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
            const token = context.req.headers.authorization;
            if(!token) {
                return { success: false, message: "Authorization token required!", quote: null };
            }
            const username = decodeJWT(token).username;
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
            const token = context.req.headers.authorization;
            if(!token) {
                return { success: false, message: "Authorization token required!", quote: null };
            }
            const username = decodeJWT(token).username;
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
            const token = context.req.headers.authorization;
            if(!token) {
                return { success: false, message: "Authorization token required!", quote: null };
            }
            const username = decodeJWT(token).username;
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
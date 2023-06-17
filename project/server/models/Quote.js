const graphql = require("./graphql.js");

class Quote {
    static async createQuote(userData, sessionId = null) {
        let query = `mutation CreateQuote($input: CreateQuoteInput!) {
                        createQuote(input: $input) {
                            success
                            quote {
                                id
                                title
                                content
                                created_at
                                numberOfLikes
                                isLiked
                                author {
                                    username
                                    first_name
                                    last_name
                                }
                            }
                        }
                    }`
        let variables = {
            input: userData,
        };
        const response = await graphql.createRequest({ query, variables, sessionId });
        return response.createQuote;
    }

    static async getQuotes({ offset, username = null, sessionId = null }) {
        // It will check if the user logged through the session of the user
        let query = `query GetQuotes($offset: Int!, $username: String) {
                        quotes(offset: $offset, username: $username) {
                            id
                            title
                            content
                            created_at
                            numberOfLikes
                            isLiked
                            author {
                                username
                                first_name
                                last_name
                            }
                        }
                    }`
        let variables = {
            offset: offset,
            username: username
        };
        const response = await graphql.createRequest({ query, variables, sessionId });
        return response.quotes;
    }

    static async likeQuote(quoteId, sessionId = null) {
        let query = `mutation($quoteId: Int!) {
            likeQuote(quote_id: $quoteId) {
                    success
                    message
                }
            }`
        let variables = {
            quoteId: quoteId,
        };
        const response = await graphql.createRequest({ query, variables, sessionId });
        return response;
    }

    static async dislikeQuote(quoteId, sessionId = null) {
        let query = `mutation($quoteId: Int!) {
                        dislikeQuote(quote_id: $quoteId) {
                            success
                            message
                        }
                    }`
        let variables = {
            quoteId: quoteId,
        };
        const response = await graphql.createRequest({ query, variables, sessionId });
        return response;
    }

    static async deleteQuote(quoteId, sessionId = null) {
        let query = `mutation($quoteId: Int!) {
            deleteQuote(quote_id: $quoteId) {
                    success
                    message
                }
            }`
        let variables = {
            quoteId: quoteId,
        };
        const response = await graphql.createRequest({ query, variables, sessionId });
        return response;
    }

    static async updateQuote(quoteData, sessionId = null) {
        let query = `mutation($input: UpdateQuoteInput!) {
            updateQuote(input: $input) {
                    success
                    quote {
                        title
                        content
                    }
                }
            }`
        let variables = {
            input: quoteData,
        };
        const response = await graphql.createRequest({ query, variables, sessionId });
        return response.updateQuote;
    }
}

module.exports = Quote;
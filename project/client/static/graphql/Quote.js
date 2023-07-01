import { graphQLRequest } from './request.js';

class Quote {
    static async createQuote(quoteData) {
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
                                isLogged
                                isOwned
                                author {
                                    username
                                    first_name
                                    last_name
                                }
                            }
                        }
                    }`
        let variables = {
            input: quoteData,
        };
        const response = await graphQLRequest({ query, variables });
        return response.data.createQuote;
    }

    static async getQuotes({ offset, username = null }) {
        // It will check if the user logged through the session of the user
        let query = `query GetQuotes($offset: Int!, $username: String) {
                        quotes(offset: $offset, username: $username) {
                            id
                            title
                            content
                            created_at
                            numberOfLikes
                            isLiked
                            isLogged
                            isOwned
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
        const response = await graphQLRequest({ query, variables });
        return response.data.quotes;
    }

    static async likeQuote(quoteId) {
        let query = `mutation($quoteId: Int!) {
            likeQuote(quote_id: $quoteId) {
                    success
                    message
                }
            }`
        let variables = {
            quoteId: quoteId,
        };
        const response = await graphQLRequest({ query, variables });
        return response.data.likeQuote;
    }

    static async dislikeQuote(quoteId) {
        let query = `mutation($quoteId: Int!) {
                        dislikeQuote(quote_id: $quoteId) {
                            success
                            message
                        }
                    }`
        let variables = {
            quoteId: quoteId,
        };
        const response = await graphQLRequest({ query, variables });
        return response.data.dislikeQuote;
    }

    static async deleteQuote(quoteId) {
        let query = `mutation($quoteId: Int!) {
            deleteQuote(quote_id: $quoteId) {
                    success
                    message
                }
            }`
        let variables = {
            quoteId: quoteId,
        };
        const response = await graphQLRequest({ query, variables });
        return response.data.deleteQuote;
    }

    static async updateQuote(quoteData) {
        let query = `mutation($input: UpdateQuoteInput!) {
            updateQuote(input: $input) {
                    success
                    quote {
                        title
                        content
                        isLiked
                        isLogged
                        isOwned
                    }
                }
            }`
        let variables = {
            input: quoteData,
        };
        const response = await graphQLRequest({ query, variables });
        return response.data.updateQuote;
    }
}

export default Quote;
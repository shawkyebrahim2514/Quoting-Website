import { graphQLRequest } from './request.js';

class Quote {
    static async createQuote(quoteData) {
        let query = `mutation CreateQuote($input: CreateQuoteInput!) {
                        createQuote(input: $input) {
                            success
                            quote {
                                _id
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
                            _id
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
        let query = `mutation($quoteId: String!) {
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
        let query = `mutation($quoteId: String!) {
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
        let query = `mutation($quoteId: String!) {
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
                    message
                }
            }`
        let variables = {
            input: quoteData,
        };
        const response = await graphQLRequest({ query, variables });
        return response.data.updateQuote;
    }

    static async searchQuotes(word) {
        let query = `query($word: String!) {
            quotesSearch(word: $word) {
                    _id
                    title
                    content
                }
            }`
        let variables = {
            word: word,
        };
        const response = await graphQLRequest({ query, variables });
        return response.data.quotesSearch;
    }

    static async getFullQuoteInfo(quoteId) {
        let query = `query($quoteId: String!) {
            quote(id: $quoteId) {
                    _id
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
                        bio
                    }
                }
            }`
        let variables = {
            quoteId: quoteId,
        };
        const response = await graphQLRequest({ query, variables });
        return response.data.quote;
    }
}

export default Quote;
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    "Check user credentials"
    userAuthentication(username: String!, password: String!): UserAuthenticationResponse!
    "Get all users in the database"
    users(offset: Int!): [User!]!
    "Get a user by email"
    user(username: String!): User
    "Get all quotes in the database that belong to a user"
    quotes(loggedInUser: String, username: String, offset: Int!): [Quote!]!
    "Get a quote by id"
    quote(loggedInUser: String, id: ID!): Quote
  }

  type Mutation {
    "Create a new user"
    createUser(input: CreateUserInput!): CreateUserPayload!
    "Create a new quote"
    createQuote(input: CreateQuoteInput!): CreateQuotePayload!
    "Like a quote"
    likeQuote(quote_id: Int!): LikeQuotePayload!
    "Dislike a quote"
    dislikeQuote(quote_id: Int!): DislikeQuotePayload!
    "Delete a quote"
    deleteQuote(quote_id: Int!): DeleteQuotePayload!
    "Update a quote"
    updateQuote(input: UpdateQuoteInput!): UpdateQuotePayload!
  }

  "User type that represents a user date in the database"
  type User {
    "Username of the user"
    username: String
    "Email of the user"
    email: String
    "The first name of the user"
    first_name: String
    "The last name of the user"
    last_name: String
    "Get the user's quotes"
    quotes(loggedInUser: String offset: Int!): [Quote!]!
  }

  "Quote type that represents a quote in the database"
  type Quote {
    "ID of the quote"
    id: ID!
    "Title of the quote"
    title: String!
    "Content of the quote"
    content: String!
    "The date the quote was created"
    created_at: String!
    "The number of likes of the quote"
    numberOfLikes: Int!
    "Check if the quote is liked by the logged user"
    isLiked: Boolean!
    "The author of the quote"
    author: User!
  }

  "Response type for authentication, it will return a success (false or true) and message"
  type UserAuthenticationResponse {
    success: Boolean!
    message: String!
  }

  "Input type for creating a new user"
  input CreateUserInput {
    "Username of the user"
    username: String!
    "Email of the user"
    email: String!
    "Password of the user"
    password: String!
    "The first name of the user"
    first_name: String!
    "The last name of the user"
    last_name: String!
  }

  "Payload type for creating a new user, it will return a success (false or true) and message"
  type CreateUserPayload {
    "Success of the mutation"
    success: Boolean!
    "Message of the mutation"
    message: String
  }

  "Input type for creating a new quote"
  input CreateQuoteInput {
    "Title of the quote"
    title: String!
    "Content of the quote"
    content: String!
  }

  "Payload type for creating a new quote, it will return a success (false or true) and message"
  type CreateQuotePayload {
    "Success of the mutation"
    success: Boolean!
    "Message of the mutation"
    message: String!
    "The returned quote if the mutation was successful"
    quote: Quote
  }

  "Payload type for liking a quote, it will return a success (false or true) and message"
  type LikeQuotePayload {
    "Success of the mutation"
    success: Boolean!
    "Message of the mutation"
    message: String
  }

  "Payload type for disliking a quote, it will return a success (false or true) and message"
  type DislikeQuotePayload {
    "Success of the mutation"
    success: Boolean!
    "Message of the mutation"
    message: String
  }

  "Payload type for deleting a quote, it will return a success (false or true) and message"
  type DeleteQuotePayload {
    "Success of the mutation"
    success: Boolean!
    "Message of the mutation"
    message: String
  }

  "Input type for updating a quote"
  input UpdateQuoteInput {
    "ID of the quote"
    id: ID!
    "Title of the quote"
    title: String!
    "Content of the quote"
    content: String!
  }

  "Payload type for updating a quote, it will return a success (false or true) and message"
  type UpdateQuotePayload {
    "Success of the mutation"
    success: Boolean!
    "Message of the mutation"
    message: String!
    "The returned quote if the mutation was successful"
    quote: Quote
  }
`;

module.exports = typeDefs;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    "Check user credentials"
    userAuthentication(username: String!, password: String!): UserAuthenticationResponse!
    "Get all users in the database"
    users: [User!]!
    "Get a user by his username"
    user(username: String!): User
    "Get all quotes in the database that belong to a user"
    quotes(
      "Used to give a sign if this quote can be liked or disliked by this user and check if the quote is liked by this username, if not provided, the logged in username will be taken from the authorization header"
      loggedInUser: String, 
      "The username of the user that the quotes belong to, if not provided, all quotes will be returned descendingly by the number of likes"
      username: String, 
      "The offset used for pagination"
      offset: Int!): [Quote!]!
    "Get a quote by id"
    quote(
      "Used to give a sign if this quote can be liked or disliked by this user and check if the quote is liked by this username, if not provided, the logged in username will be taken from the authorization header"
      loggedInUser: String, 
      "The id of the quote to get"
      id: String!): Quote
    quotesSearch(
      "Word to search for in the quotes (in title or content)"
      word: String!): [Quote!]!
  }

  type Mutation {
    "Create a new user"
    createUser(input: CreateUserInput!): CreateUserPayload!
    "Update a user"
    updateUser(input: UpdateUserInput!): UpdateUserPayload!
    "Create a new quote"
    createQuote(input: CreateQuoteInput!): CreateQuotePayload!
    "Like a quote"
    likeQuote(quote_id: String!): LikeQuotePayload!
    "Dislike a quote"
    dislikeQuote(quote_id: String!): DislikeQuotePayload!
    "Delete a quote"
    deleteQuote(quote_id: String!): DeleteQuotePayload!
    "Update a quote"
    updateQuote(input: UpdateQuoteInput!): UpdateQuotePayload!
  }

  "User type that represents a user date in the database"
  type User {
    "Username of the user"
    username: String!
    "Email of the user"
    email: String!
    "The first name of the user"
    first_name: String!
    "The last name of the user"
    last_name: String!
    "Bio of the user"
    bio: String!
    "Get the user's quotes"
    quotes(
      "Used to check if the quote is liked by this username, if not provided, the logged in username will be taken from the authorization header"
      loggedInUser: String, 
      "The offset used for pagination"
      offset: Int!): [Quote!]!
  }

  "Quote type that represents a quote in the database"
  type Quote {
    "ID of the quote"
    _id: String!
    "Title of the quote"
    title: String!
    "Content of the quote"
    content: String!
    "The date the quote was created"
    created_at: String!
    "The number of likes of the quote"
    numberOfLikes: Int!
    "Determines if the quote is liked by the logged username, so it can be distinguished in the frontend"
    isLiked: Boolean!
    "Determines if the user is logged in, so he can like or dislike the quote"
    isLogged: Boolean!
    "Determines if the quote is owned by the logged username (has the authority), so he can delete or update the quote"
    isOwned: Boolean!
    "The author of the quote"
    author: User!
  }

  "Response type for authentication, it will return a success (false or true) and message"
  type UserAuthenticationResponse {
    "Determines if the authentication was successful"
    success: Boolean!
    "Message of the authentication"
    message: String!
    "The returned user if the authentication was successful"
    user: User
  }

  "Input type for creating a new user"
  input CreateUserInput {
    "Username of the user"
    username: String!
    "Password of the user"
    password: String!
    "Email of the user"
    email: String!
    "The first name of the user"
    first_name: String!
    "The last name of the user"
    last_name: String!
  }

  "Payload type for creating a new user, it will return a success (false or true) and message"
  type CreateUserPayload {
    "Determines if the mutation was successful"
    success: Boolean!
    "Message of the mutation"
    message: String
  }

  "Input type for updating a user"
  input UpdateUserInput {
    "Username of the user"
    username: String!
    "Old password of the user"
    oldPassword: String!
    "New password of the user"
    newPassword: String!
    "The first name of the user"
    first_name: String!
    "The last name of the user"
    last_name: String!
    "Bio of the user"
    bio: String!
  }

  "Payload type for updating a user, it will return a success (false or true) and message"
  type UpdateUserPayload {
    "Determines if the mutation was successful"
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

  "Payload type for creating a new quote, it will return a success (false or true), message and the new created quote if the mutation was successful"
  type CreateQuotePayload {
    "Determines if the mutation was successful"
    success: Boolean!
    "Message of the mutation"
    message: String!
    "The returned quote if the mutation was successful"
    quote: Quote
  }

  "Payload type for liking a quote, it will return a success (false or true) and message"
  type LikeQuotePayload {
    "Determines if the mutation was successful"
    success: Boolean!
    "Message of the mutation"
    message: String
  }

  "Payload type for disliking a quote, it will return a success (false or true) and message"
  type DislikeQuotePayload {
    "Determines if the mutation was successful"
    success: Boolean!
    "Message of the mutation"
    message: String
  }

  "Payload type for deleting a quote, it will return a success (false or true) and message"
  type DeleteQuotePayload {
    "Determines if the mutation was successful"
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

  "Payload type for updating a quote, it will return a success (false or true), and message"
  type UpdateQuotePayload {
    "Determines if the mutation was successful"
    success: Boolean!
    "Message of the mutation"
    message: String!
  }
`;

module.exports = typeDefs;

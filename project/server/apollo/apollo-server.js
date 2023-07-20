const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./models/schema");
const resolvers = require("./resolvers/resolvers");

async function runApolloServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      // We will need this req object to get the JWT token from the request header
      req: req,
    }),
    // allows tools like GraphQL Playground or Apollo Explorer to explore the GraphQL schema and execute queries.
    introspection: true,
    cache: "bounded",
    persistedQueries: false
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

module.exports = runApolloServer;

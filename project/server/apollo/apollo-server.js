const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./models/schema");
const resolvers = require("./resolvers/resolvers");

async function runApolloServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      req: req,
      session: req.session,
    }),
    introspection: true,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

module.exports = runApolloServer;

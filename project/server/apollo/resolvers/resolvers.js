const queryResolver = require("./query-resolver");
const quoteResolver = require("./quote-resolver");
const userResolver = require("./user-resolver");
const mutationResolver = require("./mutation-resolver");
const resolvers = {
  ...queryResolver,
  ...quoteResolver,
  ...userResolver,
  ...mutationResolver,
};

module.exports = resolvers;

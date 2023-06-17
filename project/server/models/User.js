const graphql = require("./graphql.js");

class User {
  static async createUser(userData) {
    let query = `mutation CreateUser($input: CreateUserInput!) {
                    createUser(input: $input) {
                      success
                      message
                    }
                  }`
    let variables = {
      input: userData,
    };
    const response = await graphql.createRequest({ query, variables });
    return response.createUser;
  }

  static async checkUserAuthentication(userData) {
    let query = `query ($username: String!, $password: String!) {
                    userAuthentication(username: $username, password: $password) {
                      success
                      message
                    }
                  }`
    let variables = {
      username: userData.username,
      password: userData.password,
    };
    const response = await graphql.createRequest({ query, variables });
    return response.userAuthentication;
  }

  static async getUserName(username) {
    let query = `query ($username: String!) {
                      user(username: $username) {
                        first_name
                        last_name
                      }
                  }`
    let variables = {
      username: username,
    };
    const response = await graphql.createRequest({ query, variables });
    return response.user;
  }
}

module.exports = User;
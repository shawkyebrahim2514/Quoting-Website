import { graphQLRequest } from './request.js';

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
        const response = await graphQLRequest({ query, variables });
        return response.data.createUser;
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
        const response = await graphQLRequest({ query, variables });
        return response.data.userAuthentication;
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
        const response = await graphQLRequest({ query, variables });
        return response.data.user;
    }
}

export default User;

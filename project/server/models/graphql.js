// Get the graphql url from the .env file
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.HOST_DOMAIN : process.env.DEVELOPMENT_DOMAIN;
const graphqlUrl = `${baseUrl}/graphql`;

async function createRequest({ query, variables = {}, sessionId = null }) {
    console.log("graphqlUrl: ", graphqlUrl);
    console.log("ENV: ", process.env.NODE_ENV);
    console.log("HOST_DOMAIN: ", process.env.HOST_DOMAIN);
    const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': sessionId,
        },
        body: JSON.stringify({
            query: `${query}`,
            variables: variables,
        }),
    });
    let responseJson = await response.json();
    return responseJson.data;
}

module.exports = {
    createRequest,
};
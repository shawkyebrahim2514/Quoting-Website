// The authorization token will be taken from the cookie in the server side
function graphQLRequest({ query, variables = {} }) {
    return fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    }).then((res) => res.json());
}

export { graphQLRequest }
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.utaifal.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        // To use the $search stage, you need to either set the apiStrict option to false
        // or use a later API version that supports the $search stage.
        strict: false,
        deprecationErrors: true,
    }
});

client.connect();

const db = client.db('QuotingWebsite');

module.exports = { db, client };
const { db } = require("./databaseConnection");
const { ObjectId } = require('mongodb');

const { organizeQuotes, organizeSearchQuotes } = require("./util");
class Quote {
  // The common query for getting quotes
  // It allows a condition to be added to the query
  // It allows an offset to be added to the query
  // It allows an orderBy to be added to the query
  // It uses the loggedUser to check if the quote is liked by this user, and return isLiked = 1 if it is liked, otherwise isLiked = 0
  // The isLogged is used to check if the user is logged in, so he can like the quote
  // The isOwned is used to check if the quote is owned by the logged in user, so he can delete or update it
  static #getQuoteQuery({
    condition = {}, offset = 0, orderBy = { created_at: -1 }, loggedInUser = null
  }) {
    let query = [
      { $match: condition },
      {
        // Join the quote with the quoteLikes collection
        // This is used to get the number of likes for each quote
        $lookup: {
          from: "quoteLikes",
          localField: "_id",
          foreignField: "quote_id",
          as: "likes"
        }
      },
      {
        $set: {
          numberOfLikes: {
            $size: "$likes"
          }
        }
      },
      { $sort: orderBy },
      { $skip: offset },
      { $limit: 6 },
      {
        // Join the quote with the quoteLikes collection
        // This is used to check if the quote is liked by the logged in user
        $lookup: {
          from: "quoteLikes",
          localField: "_id",
          foreignField: "quote_id",
          pipeline: [
            { $match: { username: loggedInUser } }
          ],
          as: "isLiked"
        }
      },
      {
        $set: {
          // Get the time difference between the current time and the quote creation time
          created_at: {
            $subtract: [new Date(), "$created_at"]
          },
          isLiked: {
            $gt: [{ $size: "$isLiked" }, 0]
          },
          isLogged: (loggedInUser ? true : false),
          isOwned: {
            $eq: ["$username", loggedInUser]
          }
        }
      },
      {
        $project: {
          // Execlude the likes array from the result of getting the number of likes
          likes: 0
        }
      }
    ];
    return query;
  }

  static async getAllQuotesByUsername({ username, offset, loggedInUser }) {
    return new Promise((resolve, reject) => {
      // Order by the quote creation time (Default value)
      let query = Quote.#getQuoteQuery({
        condition: { username },
        offset: offset,
        loggedInUser: loggedInUser
      });
      db.collection("quotes").aggregate(query).toArray()
        .then(result => {
          organizeQuotes(result);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async getQuote({ id, loggedInUser }) {
    return new Promise((resolve, reject) => {
      let query = Quote.#getQuoteQuery({
        condition: { _id: new ObjectId(id) },
        loggedInUser: loggedInUser
      });
      db.collection("quotes").aggregate(query).toArray()
        .then(result => {
          organizeQuotes(result);
          resolve(result[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getAllQuotes({ offset, loggedInUser }) {
    return new Promise((resolve, reject) => {
      // All quotes want to be returned so the condition will be the empty object (Default value)
      let query = Quote.#getQuoteQuery({
        offset: offset,
        orderBy: { numberOfLikes: -1, created_at: -1 },
        loggedInUser: loggedInUser
      });
      db.collection("quotes").aggregate(query).toArray()
        .then(result => {
          organizeQuotes(result);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async createQuote({ quoteData, username }) {
    return new Promise((resolve, reject) => {
      const quote = {
        title: quoteData.title,
        content: quoteData.content,
        username: username,
        // We must specify the current date manually because the MongoDB driver doesn't do that automatically
        created_at: new Date()
      };
      db.collection("quotes").insertOne(quote)
        .then(result => {
          // This new quote will be with 0 likes so not liked by the logged in user
          // The user absolutely is logged in because he can create a quote
          // The user is the owner of this quote because he can create it
          const newQuote = {
            ...quote,
            _id: result.insertedId,
            numberOfLikes: 0,
            isLiked: false,
            isLogged: true,
            isOwned: true,
            created_at: 0
          };
          organizeQuotes([newQuote]);
          resolve(newQuote);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async likeQuote({ quote_id, username }) {
    return await new Promise((resolve, reject) => {
      db.collection("quoteLikes").insertOne({
        // We must wrap the quote_id with ObjectId because it is a string
        quote_id: new ObjectId(quote_id),
        username
      })
        .then(result => {
          resolve("Quote is liked successfully!");
        })
        .catch(err => {
          reject("Quote is already liked by this user or invalid data!");
        });
    });
  }

  static async dislikeQuote({ quote_id, username }) {
    return await new Promise((resolve, reject) => {
      db.collection("quoteLikes").deleteOne({
        // We must wrap the quote_id with ObjectId because it is a string
        quote_id: new ObjectId(quote_id),
        username: username
      })
        .then(result => {
          resolve("Quote is disliked successfully!");
        })
        .catch(err => {
          reject("Quote is not liked by this user or invalid data!");
        });
    });
  }

  static async deleteQuote({ quote_id, username }) {
    return await new Promise((resolve, reject) => {
      db.collection("quotes").deleteOne({
        // We must wrap the quote_id with ObjectId because it is a string
        _id: new ObjectId(quote_id),
        username: username
      })
        .then(result => {
          if (result.deletedCount === 0) {
            reject("Quote is not created by this user or invalid data!");
          }
          // Delegate the deletion of the quote likes to the database
          db.collection("quoteLikes").deleteMany({ quote_id: new ObjectId(quote_id) });
          resolve("Quote is deleted successfully!");
        })
        .catch(err => {
          reject("Error while deleting quote, or invalid data!");
        });
    });
  }

  static async updateQuote({ quoteData, username }) {
    return await new Promise((resolve, reject) => {
      db.collection("quotes").updateOne({
        // We must wrap the quote_id with ObjectId because it is a string
        _id: new ObjectId(quoteData.id),
        username: username
      }, {
        $set: {
          title: quoteData.title,
          content: quoteData.content
        }
      })
        .then(result => {
          if(result.matchedCount === 0) {
            reject("Quote is not created by this user or invalid data!");
          }
          if (result.modifiedCount === 0) {
            reject("Quote is up to date!");
          }
          resolve("Quote is updated successfully!");
        })
        .catch(err => {
          reject("Error while updating quote, or invalid data!");
        });
    });
  }

  static searchQuotes(word) {
    return new Promise((resolve, reject) => {
      // Make the searching to be on the title and the content of the quote using the autocomplete feature
      const fields = ["content", "title"];
      const subQueries = fields.map(field => ({
        autocomplete: {
          query: word,
          path: field
        }
      }));
      let query = [
        {
          $search: {
            index: "QuotingWebsiteSearchIndex",
            compound: {
              should: subQueries
            }
          }
        },
        {
          // Only return the first 4 quotes
          $limit: 4
        },
        {
          $project: { 
            // Only return the id, title and content of the quote
            _id: 1, title: 1, content: 1
          }
        }
      ]
      db.collection("quotes").aggregate(query).toArray()
        .then(result => {
          organizeSearchQuotes(result);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = Quote;

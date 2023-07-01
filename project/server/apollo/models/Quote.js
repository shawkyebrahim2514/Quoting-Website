const connection = require("./databaseConnection");
const { convertQueriesDate, convertQueryDate } = require("./util");
class Quote {
  // The common query for getting quotes
  // It allows a condition to be added to the query
  // It allows an offset to be added to the query
  // It allows an orderBy to be added to the query
  // It uses the loggedUser to check if the quote is liked by this user, and return isLiked = 1 if it is liked, otherwise isLiked = 0
  // The isLogged is used to check if the user is logged in, so he can like the quote
  // The isOwned is used to check if the quote is owned by the logged in user, so he can delete or update it
  static #getQuoteQuery({
    condition, offset = 0, orderBy = "created_at desc", loggedInUser = null
  }) {
    let query = `select ${loggedInUser ? `exists(select quote_id from QuoteLike where quote_id = q.id and username = '${loggedInUser}')` : 0} as isLiked,
            ${loggedInUser ? 1 : 0} as isLogged,
            iif(q.username == '${loggedInUser}', 1, 0) as isOwned,
            q.id,
            title,
            content,
            q.username,
            strftime('%s', 'now') - strftime('%s', created_at) AS created_at,
            count(ql.quote_id) as numberOfLikes
            from Quote as q
            left join QuoteLike as ql on ql.quote_id = q.id
            ${condition}
            group by q.id
            order by ${orderBy}
            limit 6 offset ${offset}`;
    return query;
  }

  static async getAllQuotesByUsername({ username, offset, loggedInUser }) {
    return await new Promise((resolve, reject) => {
      connection.all(
        Quote.#getQuoteQuery({
          condition: `where q.username = '${username}'`,
          offset: offset,
          orderBy: "created_at desc",
          loggedInUser: loggedInUser
        }),
        (err, rows) => {
          if (err) {
            reject("Error while getting quotes!");
          } else {
            convertQueriesDate(rows);
            resolve(rows);
          }
        }
      );
    });
  }

  static async getQuote({ id, loggedInUser }) {
    return await new Promise((resolve, reject) => {
      connection.all(
        Quote.#getQuoteQuery({
          condition: `where q.id = ${id}`,
          loggedInUser: loggedInUser
        }),
        (err, rows) => {
          if (err) {
            reject("Error while getting quote!");
          } else {
            // the required quote is the first element in the array
            let quote = rows[0];
            convertQueryDate(quote);
            resolve(quote);
          }
        }
      );
    });
  }

  static async getAllQuotes({ offset, loggedInUser }) {
    return await new Promise((resolve, reject) => {
      connection.all(Quote.#getQuoteQuery({
        condition: "",
        offset: offset,
        orderBy: "numberOfLikes desc, created_at desc",
        loggedInUser: loggedInUser
      }), (err, rows) => {
        if (err) {
          reject("Error while getting quotes!");
        } else {
          convertQueriesDate(rows);
          resolve(rows);
        }
      });
    });
  }

  static async createQuote({ quoteData, username }) {
    return await new Promise((resolve, reject) => {
      connection.run(
        `INSERT INTO Quote (title, content, username) VALUES (?, ?, ?)`,
        [quoteData.title, quoteData.content, username],
        function (err) {
          if (err) {
            reject("Error while creating quote, or invalid data!");
          } else {
            const lastInsertedId = this.lastID;
            resolve(Quote.getQuote({ id: lastInsertedId, loggedInUser: username }));
          }
        }
      );
    });
  }

  static async likeQuote({ quote_id, username }) {
    return await new Promise((resolve, reject) => {
      connection.run(
        `insert into QuoteLike (quote_id, username) values (?, ?)`,
        [quote_id, username],
        (err) => {
          if (err) {
            reject("Quote is already liked by this user!");
          } else {
            if (this.changes === 0) {
              reject("Error while liking quote, or invalid data!");
            }
            resolve("Quote is liked successfully!");
          }
        }
      );
    });
  }

  static async dislikeQuote({ quote_id, username }) {
    return await new Promise((resolve, reject) => {
      connection.run(
        `delete from QuoteLike where quote_id = ? and username = ?`,
        [quote_id, username],
        (err) => {
          if (err) {
            reject("Error while disliking quote, or invalid data!");
          } else {
            if (this.changes === 0) {
              reject("Quote is not liked by this user!");
            }
            resolve("Quote is disliked successfully!");
          }
        }
      );
    });
  }

  static async deleteQuote({ quote_id, username }) {
    return await new Promise((resolve, reject) => {
      connection.run(
        `delete from Quote where id = ? and username = ?`,
        [quote_id, username],
        (err) => {
          if (err) {
            reject("Error while deleting quote, or invalid data!");
          } else {
            if (this.changes === 0) {
              reject("Quote is not created by this user!");
            }
            resolve("Quote is deleted successfully!");
          }
        }
      );
    });
  }

  static async updateQuote({ quoteData, username }) {
    return await new Promise((resolve, reject) => {
      connection.run(
        `update Quote set title = ?, content = ? where id = ? and username = ?`,
        [quoteData.title, quoteData.content, quoteData.id, username],
        function (err) {
          if (err) {
            reject(err);
          } else {
            if (this.changes === 0) {
              reject("Quote is not created by this user!");
            }
            resolve("Quote is updated successfully!");
          }
        }
      );
    });
  }
}

module.exports = Quote;

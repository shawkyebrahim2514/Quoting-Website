const connection = require("./databaseConnection");
const bcrypt = require("bcryptjs");
class User {
  static async checkUserAuthentication(username, password) {
    return await new Promise((resolve, reject) => {
      connection.all(
        `SELECT password FROM User WHERE username = '${username}'`,
        (err, rows) => {
          if (err) {
            reject("Error while authenticating user!");
          } else {
            if (rows.length === 0) {
              reject("User not found!");
            } else {
              let isPasswordValid = checkValidPassword(password, rows[0].password);
              if (isPasswordValid) {
                resolve("User authenticated successfully!");
              } else {
                reject("password isn't correct!");
              }
            }
          }
        }
      );
    });
  }

  static async getAllUsers() {
    return await new Promise((resolve, reject) => {
      connection.all(
        "SELECT email, username, first_name, last_name FROM User",
        (err, rows) => {
          if (err) {
            reject("Error while getting users!");
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async getUser(username) {
    return await new Promise((resolve, reject) => {
      connection.all(
        `SELECT email, username, first_name, last_name FROM User where username = '${username}'`,
        (err, rows) => {
          if (err) {
            reject("Error while getting user!");
          } else {
            // return the required user that in the first row
            resolve(rows[0]);
          }
        }
      );
    });
  }

  static async createUser(user) {
    hashUserPassword(user);
    return await new Promise((resolve, reject) => {
      connection.run(
        `INSERT INTO User (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)`,
        [user.username, user.email, user.password, user.first_name, user.last_name],
        (err) => {
          if (err) {
            reject("User already exists or invalid data");
          } else {
            resolve("User created successfully");
          }
        }
      );
    });
  }
};

function checkValidPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

function hashUserPassword(user) {
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
}

module.exports = User;

const { db } = require("./databaseConnection");
const { checkValidPassword, hashPassword } = require("./util");

class User {
  static async checkUserAuthentication(username, password) {
    return new Promise((resolve, reject) => {
      db.collection("users").findOne({
        username: username
      })
        .then(result => {
          if (!result) {
            reject({ message: "User not found!", user: null });
          }
          let isPasswordValid = checkValidPassword(password, result.password);
          if (isPasswordValid) {
            // Remove the password field before sending the user object
            delete result.password;
            resolve({ message: "User authenticated successfully!", user: result });
          } else {
            reject({ message: "Username or password isn't correct!", user: null });
          }
        })
        .catch(err => {
          reject({ message: "Internal server error!", user: null });
        });
    });
  }

  static async getAllUsers() {
    return new Promise((resolve, reject) => {
      // Exclude the password field from the result
      db.collection("users").find({}, { password: 0 }).toArray()
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async getUser(username) {
    return new Promise((resolve, reject) => {
      // Exclude the password field from the result
      db.collection("users").findOne({
        username: username
      }, { password: 0 })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async createUser(user) {
    // Hash the password before storing it in the database
    user.password = hashPassword(user.password);
    return new Promise((resolve, reject) => {
      db.collection("users").insertOne({
        username: user.username,
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name
      })
        .then(result => {
          resolve("User created successfully");
        })
        .catch(err => {
          reject("User already exists or invalid data");
        });
    });
  }

  static async updateUser(user) {
    // If the user want to update his password, he must provide the old password
    if (user.oldPassword) {
      try {
        await this.checkUserAuthentication(user.username, user.oldPassword);
      } catch (err) {
        throw new Error("Invalid password provided");
      }
    }
    // Main fields to be updated
    let updateFields = {
      first_name: user.first_name,
      last_name: user.last_name,
      bio: user.bio
    }
    // If the user want to update his password, hash the new password and update it
    if (user.newPassword) {
      updateFields.password = hashPassword(user.newPassword);
    }
    return new Promise((resolve, reject) => {
      db.collection("users").updateOne({
        username: user.username
      }, {
        $set: updateFields
      }).then(result => {
        if (result.modifiedCount === 0) {
          reject("Data already up to date");
        }
        resolve("User data updated successfully");
      }).catch(err => {
        console.log(err);
        reject("User not found or invalid password provided");
      });
    });
  }
};

module.exports = User;

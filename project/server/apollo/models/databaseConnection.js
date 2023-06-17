// create a connection to the database SQLite3
const sqlite3 = require('sqlite3');
const connection = new sqlite3.Database("./server/config/db.sqlite3");
module.exports = connection;
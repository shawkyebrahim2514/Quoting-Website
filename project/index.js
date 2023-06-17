const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const runApolloServer = require("./server/apollo/apollo-server");
const { appRouters } = require("./server/app");
const app = express();
const path = require("path");
require('dotenv').config({ path: 'server/config/.env' });

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client", "views"));
app.use(express.static(path.join(__dirname, "client", "static")));

runApolloServer(app);

app.use("/", appRouters);

app.use('/',(req, res, next) => {
  if(req.path === '/graphql') {
    return next();
  } else {
    res.render('404', { authenticated: req.session.username });
  }
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
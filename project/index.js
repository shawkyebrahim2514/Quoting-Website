const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const runApolloServer = require("./server/apollo/apollo-server");
const { appRouters } = require("./server/app");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client", "views"));
app.use(express.static(path.join(__dirname, "client", "static")));

runApolloServer(app);

app.use("/", appRouters);

app.use('/', (req, res, next) => {
  if (req.path === '/graphql') {
    return next();
  } else {
    res.render('404', { authenticated: req.session.username });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
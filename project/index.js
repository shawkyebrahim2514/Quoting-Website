const express = require("express");
const bodyParser = require('body-parser');
const runApolloServer = require("./server/apollo/apollo-server");
const { appRouter } = require("./server/app");
const { attachJWTToAuthorizationHeader } = require("./server/controllers/util/middlewares");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client", "views"));
app.use(express.static(path.join(__dirname, "client", "static")));

app.use(attachJWTToAuthorizationHeader);

(async () => {
  await runApolloServer(app);
  app.use("/", appRouter);
})();


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
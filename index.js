const express = require("express");
const database = require("./config/database");
const { router } = require("./routers/user.router");
const cookies = require("cookie-parser");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const { localAuth } = require("./middleware/user.auth");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads/image",
  express.static(path.join(__dirname, "/uploads/image"))
);

app.set("view engine", "ejs");
app.use(cookies());

localAuth(passport)

app.use(session({ secret: "private-key" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(8081, (err) => {
  database();
  if (!err) {
    console.log("server start: http://localhost:8081");
  }
});

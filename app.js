require("dotenv").config();
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const appRouter = require("./routes/appRoutes");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
let app = express();

app.set("view engine", "ejs");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/app/v1/persons", appRouter);

module.exports = app;

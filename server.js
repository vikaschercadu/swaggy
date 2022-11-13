const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
const config = require("./config.json");
const passport = require("passport");

mongoose.connect(
  config.databaseUrl,
  err => {
    if (err) {
      throw err;
    }
    console.log("Node Server Connected to Mongo Database");
  }
);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

const customerroutes = require("./routes/customer");

app.use("/customer", customerroutes);

const port = process.env.port || 1234;
app.listen(port, err => {
  if (err) {
    throw err;
  }
  console.log(`Server Running at port number ${port}`);
});

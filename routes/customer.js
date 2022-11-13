const express = require("express");
const Router = express.Router();
const path = require("path");
const passport = require("passport");
const passportConfig = require("./CustomerPassport.js");
const Customer = require("../models/customer");

Router.route("/register")
  .get((req, res, next) => {
    res.sendFile(path.join(__dirname + "/../views/customerregister.html"));
  })
  .post((req, res, next) => {
    req.checkBody("Customer_Name", "Invalid Name").notEmpty();
    req.checkBody("Customer_Email", "Invalid Email").isEmail();
    req
      .checkBody("Customer_Mobile", "Invalid Number")
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/);
    req
      .checkBody("Customer_Password", "Password Not Matched")
      .equals(req.body.Customer_Password2);

    const errors = req.validationErrors();
    if (errors) {
      const err = [];
      errors.forEach(element => {
        err.push(element.msg);
      });
      res.json(err);
    } else {
      const newCustomer = new Customer();
      newCustomer.Customer_Name = req.body.Customer_Name;
      newCustomer.Customer_Email = req.body.Customer_Email;
      newCustomer.Customer_Mobile = req.body.Customer_Mobile;
      newCustomer.Customer_Password = req.body.Customer_Password;
      newCustomer.save(err => {
        if (err) {
          throw err;
        } else {
          res.json({ Status: "Success" });
        }
      });
    }
  });

Router.route("/login")
  .get((req, res, next) => {
    res.sendFile(path.join(__dirname + "/../views/customerlogin.html"));
  })
  .post(
    passport.authenticate("local-login", {
      successRedirect: "/customer/register",
      failureRedirect: "/customer/login"
    })
  );

module.exports = Router;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Customer = require("../models/customer.js");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Customer.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "Customer_Email",
      passwordField: "Customer_Password",
      passReqToCallback: true
    },
    function(req, Customer_Email, Customer_Password, done) {
      Customer.findOne({ Customer_Email: Customer_Email }, function(err, user) {
        if (err) {
          return done(err);
        }
        console.log(user);
        if (!user) {
          console.log("User not exist");
        } else if (!user.comparePassword(Customer_Password)) {
          return done(null, false, console.log("Password not matched"));
        }
        return done(null, user);
      });
    }
  )
);

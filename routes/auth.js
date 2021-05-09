const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const uploadController = require("../controllers/upload");

const User = require("../models/User");

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("auth");
  }
});

router.post("/register", (req, res, next) => {
  const { username, password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    res.redirect("/auth");
  }
  User.register({ username }, password, (err, user) => {
    if (err) {
      console.log(err);
      res.send(err).status(400);
    }
    res.render("test");
  });
});

router.post("/login", function (req, res) {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });

  req.login(user, function (err) {
    if (err) {
      return next(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log(req.isAuthenticated());
        res.redirect("/");
      });
    }
  });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;

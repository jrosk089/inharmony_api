const express = require("express");
const passport = require("passport");
require("../config/passport");
const loginRouter = express.Router({ mergeParams: true });
const local = require("passport-local");

loginRouter.get("/", (req, res) => {
  res.send(
    "This is where a login form would probably go. But, you know, this is backend stuff.\n"
  );
});

loginRouter.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (info) {
      return res.send(info.message);
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/api/login");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/api/login/authrequired");
    });
  })(req, res, next);
});

loginRouter.get("/authrequired", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("you hit the authentication endpoint\n");
  } else {
    res.redirect("/api");
  }
});

module.exports = loginRouter;

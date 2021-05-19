const express = require("express");
const passport = require("passport");
require("../config/passport");
const loginRouter = express.Router({ mergeParams: true });

loginRouter.get("/", (req, res) => {
  res.send(
    "This is where a login form would probably go. But, you know, this is backend stuff.\n"
  );
});

const auth = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (info) {
      return res.status(401).send(info.message);
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Unable to log in.\n");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/api/login/authrequired");
    });
  })(req, res, next);
};

loginRouter.post("/", auth);

loginRouter.get("/authrequired", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("You are logged in!\n");
  } else {
    res.status(401).send("Unable to log in.\n");
  }
});

module.exports = loginRouter;

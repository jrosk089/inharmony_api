const passport = require("passport");
require("../config/passport");

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
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
      return next();
    });
  })(req, res, next);
};

module.exports = checkAuth;

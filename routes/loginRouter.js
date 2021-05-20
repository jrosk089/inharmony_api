const express = require("express");
const passport = require("passport");
require("../config/passport");
const loginRouter = express.Router({ mergeParams: true });

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

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Login
 *     description: Allows users to log in
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User email
 *         in: body
 *         required: true
 *         type: string
 *         example: email1@email.com
 *       - name: password
 *         description: User password
 *         in: body
 *         required: true
 *         type: string
 *         example: password
 *     responses:
 *       200:
 *         description: User is logged in!
 *       401:
 *         description: It was not possible to log a user in (missing credentials, incorrect credentials)
 */

loginRouter.post("/", auth);

/**
 * @swagger
 * /api/login/authrequired:
 *   get:
 *     tags:
 *       - Login
 *     description: Checks if user is authenticated
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: User is not authenticated
 */

loginRouter.get("/authrequired", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send("You are logged in!\n");
  } else {
    res.status(401).send("You are not logged in.\n");
  }
});

module.exports = loginRouter;

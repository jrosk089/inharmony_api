const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { getUserByEmail, getUserById } = require("../util/knexQueries");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        console.log("Inside local strategy callback");

        const user = await getUserByEmail(email);
        console.log(user);

        if (!user) {
          return done(null, false, { message: "Invalid credentials.\n" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Invalid credentials.\n" });
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Inside serializeUser callback. User id is saved here");
  console.log(user.user_id);
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside deserializeUser callback.");
  console.log(`User id saved in session file store is ${id}`);
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

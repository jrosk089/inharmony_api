require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const timestamp = require("uuid").v1;
const uuid = require("uuid").v4;
const passport = require("passport");
require("./config/passport");
const swaggerSpec = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");

const app = express();

//use bodyParser and morgan
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//use cors (with default settings to start with)
app.use(cors());

//set up sessions
app.use(
  session({
    genid: (req) => {
      return uuid();
    },
    store: new FileStore(),
    secret: process.env.SESSION_SECRET || timestamp(),
    resave: false,
    saveUninitialized: true,
  })
);

//set up passport stuff
app.use(passport.initialize());
app.use(passport.session());

//use logger if not testing

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

//swagger

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//welcome users to API

app.get("/api", (req, res, next) => {
  res.status(200).send("Welcome to the In Harmony API!\n");
});

//import & mount loginRouter
const loginRouter = require("./routes/loginRouter");
app.use("/api/login", loginRouter);

//import & mount productsRouter
const productsRouter = require("./routes/productsRouter");
app.use("/api/products", productsRouter);

//import & mount usersRouter

const usersRouter = require("./routes/usersRouter");
app.use("/api/users", usersRouter);

//import & mount ordersRouter
const ordersRouter = require("./routes/ordersRouter");
app.use("/api/orders", ordersRouter);

//import & mount cartsRouter
const cartsRouter = require("./routes/cartsRouter");
app.use("/api/carts", cartsRouter);

//import & mount checkoutRouter
const checkoutRouter = require("./routes/checkoutRouter");
app.use("/api/checkout", checkoutRouter);

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Sorry, something's gone wrong.\n");
});

//Create server
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "test") {
  console.log("testing");
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}\n`);
});

module.exports = app;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

//use bodyParser and morgan
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//import & mount checkoutRouter
const checkoutRouter = require("./routes/checkoutRouter");
app.use("/api/checkout", checkoutRouter);

//Create server
const port = 3000;

if (process.env.NODE_ENV === "test") {
  console.log("testing");
}

app.listen(port, () => {
  console.log("App listening at http://localhost:" + port);
});

module.exports = app;

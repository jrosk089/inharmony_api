const express = require("express");
const checkoutRouter = express.Router({ mergeParams: true });
const { checkout } = require("../util/knexQueries");

checkoutRouter.post("/", async (req, res, next) => {
  try {
    const orderAdded = await checkout(req.body.cart_id);
    res.status(201).json({ order_id: orderAdded });
  } catch (err) {
    next(err);
  }
});

module.exports = checkoutRouter;

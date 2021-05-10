const express = require("express");
const ordersRouter = express.Router({ mergeParams: true });
const { getAllOrders, getOrderById } = require("../util/knexQueries");

ordersRouter.param("id", async (req, res, next, id) => {
  if (isNaN(parseInt(id))) {
    return res.status(404).send();
  }

  const order = await getOrderById(id);
  if (order) {
    req.order = order;
    next();
  } else {
    res.status(404).send();
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;

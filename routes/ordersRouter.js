const express = require("express");
const ordersRouter = express.Router({ mergeParams: true });
const { getAllOrders, getOrderById } = require("../util/knexQueries");

ordersRouter.param("id", async (req, res, next, id) => {
  if (isNaN(parseInt(id))) {
    return res.status(404).send();
  }

  const order = await getOrderById(id);

  if (!order || order.length < 1) {
    return res.status(404).send();
  }
  req.order = order;
  next();
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
    res.status(200).json(req.order);
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;

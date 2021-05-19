const express = require("express");
const ordersRouter = express.Router({ mergeParams: true });
const checkAuth = require("../util/checkAuth");
const { getOrdersForUser, getOrderById } = require("../util/knexQueries");

//TODO - change these (and the equivalent cart routes) so that they only get information for a logged in user

ordersRouter.get("/", checkAuth, async (req, res, next) => {
  try {
    const orders = await getOrdersForUser(req.user.user_id);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

ordersRouter.get("/:id", checkAuth, async (req, res, next) => {
  try {
    const id = req.params.id;

    if (isNaN(parseInt(id))) {
      return res.status(404).send();
    }

    const order = await getOrderById(id, req.user.user_id);

    if (!order || !order.length) {
      return res.status(404).send();
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;

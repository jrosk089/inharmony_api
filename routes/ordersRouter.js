const express = require("express");
const ordersRouter = express.Router({ mergeParams: true });
const checkAuth = require("../util/checkAuth");
const { getOrdersForUser, getOrderById } = require("../util/knexQueries");

/**
 * @swagger
 * /api/orders/:
 *   get:
 *     tags:
 *       - Orders
 *     description: Returns all orders for a (logged-in) user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: User id
 *         in: req.user
 *         required: true
 *         type: uuid
 *     responses:
 *       200:
 *         description: An array of orders with number of products and total price
 *         schema:
 *           order_id:
 *             type: integer
 *           user_id:
 *             type: uuid
 *           num_items:
 *             type: integer
 *           total_price:
 *             type: money
 *           example: {order_id: 1, user_id: 123e4567-e89b-12d3-a456-426614174001, num_items: 2, total_price: 2000.00}
 */

ordersRouter.get("/", checkAuth, async (req, res, next) => {
  try {
    const orders = await getOrdersForUser(req.user.user_id);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     description: Returns a single order for a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Order ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An order with individual products, the number of units and unit prices
 *         schema:
 *           order_id:
 *             type: integer
 *           user_id:
 *             type: uuid
 *           product_name:
 *             type: string
 *           unit_price:
 *             type: money
 *           num_units:
 *             type: integer
 *           example: { order_id: 1, user_id: 123e4567-e89b-12d3-a456-426614174001, product_name: prodname, unit_price: 1200.00, num_units: 2 }
 */

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

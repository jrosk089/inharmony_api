const express = require("express");
const checkoutRouter = express.Router({ mergeParams: true });
const { checkout } = require("../util/knexQueries");

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     tags:
 *       - Checkout
 *     description: Takes a cart, creates an order based on the cart, and deletes the products from the old cart
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: cart_id
 *         description: Cart id
 *         in: body
 *         required: true
 *         type: integer
 *         example: {cart_id: 1}
 *     responses:
 *       201:
 *         description: The id of the created order
 *         schema:
 *           order_id:
 *             type: integer
 *           example: {order_id: 2}
 */

checkoutRouter.post("/", async (req, res, next) => {
  try {
    const orderAdded = await checkout(req.body.cart_id);
    res.status(201).json({ order_id: orderAdded });
  } catch (err) {
    next(err);
  }
});

module.exports = checkoutRouter;

const express = require("express");
const cartsRouter = express.Router({ mergeParams: true });
const checkAuth = require("../util/checkAuth");
const {
  getCartsForUser,
  getCartById,
  addCart,
  addProductIntoCart,
  deleteProductFromCart,
} = require("../util/knexQueries");

cartsRouter.param("id", async (req, res, next, id) => {
  if (isNaN(parseInt(id))) {
    return res.status(404).send();
  }

  next();
});

/**
 * @swagger
 * /api/carts:
 *   get:
 *     tags:
 *       - Carts
 *     description: Returns all carts for a (logged-in) user
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
 *         description: An array of carts with number of products and total price
 *         schema:
 *           cart_id:
 *             type: integer
 *           user_id:
 *             type: uuid
 *           num_items:
 *             type: integer
 *           total_price:
 *             type: money
 *           example: {cart_id: 1, user_id: 123e4567-e89b-12d3-a456-426614174001, num_items: 2, total_price: 2000.00}
 */

cartsRouter.get("/", checkAuth, async (req, res, next) => {
  try {
    const carts = await getCartsForUser(req.user.user_id);
    res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     tags:
 *       - Carts
 *     description: Returns a single cart for a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Cart ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A cart with individual products, the number of units and unit prices
 *         schema:
 *           cart_id:
 *             type: integer
 *           user_id:
 *             type: uuid
 *           product_name:
 *             type: string
 *           unit_price:
 *             type: money
 *           num_units:
 *             type: integer
 *           example: { cart_id: 1, user_id: 123e4567-e89b-12d3-a456-426614174001, product_name: prodname, unit_price: 1200.00, num_units: 2 }
 */

cartsRouter.get("/:id", checkAuth, async (req, res, next) => {
  try {
    const cart = await getCartById(req.params.id, req.user.user_id);

    if (!cart || !cart.length) {
      return res.status(404).send();
    }
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/carts:
 *   post:
 *     tags:
 *       - Carts
 *     description: Creates a new cart (for a logged-in user)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product_ids
 *         description: An array of IDs of products to be added to the cart
 *         in: body
 *         required: true
 *         example: [1, 2, 3, 1]
 *       - name: user_id
 *         description: ID of user (taken from logged-in user data)
 *         in: req.user
 *         required: true
 *     responses:
 *       201:
 *         description: ID of successfully created cart
 *         schema:
 *           cart_id:
 *             type: integer
 *           user_id:
 *             type: uuid
 *           example: { cart_id: 1 }
 */

cartsRouter.post("/", checkAuth, async (req, res, next) => {
  if (!req.body.product_ids.length) {
    return res.status(400).send();
  }
  try {
    const cartId = await addCart(req.body.product_ids, req.user.user_id);
    res.status(201).json({ cart_id: cartId });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/carts/{id}:
 *   post:
 *     tags:
 *       - Carts
 *     description: Adds item into a cart (for a logged-in user)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: cart_id
 *         description: The id of the cart to which the product is to be added
 *         in: body
 *         required: true
 *         example: { cart_id: 1 }
 *       - name: product_id
 *         description: The id of a product to be added into a cart
 *         in: body
 *         required: true
 *         example: { product_id: 1 }
 *     responses:
 *       201:
 *         description: ID of product and ID of cart
 *         schema:
 *           product_id:
 *             type: integer
 *           cart_id:
 *             type: integer
 *           example: { product_id: 1, cart_id: 1}
 */

cartsRouter.post("/:id", checkAuth, async (req, res, next) => {
  try {
    const { cart_id, product_id } = req.body;
    const addedProduct = await addProductIntoCart(cart_id, product_id);
    res.status(201).json(addedProduct);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/carts:
 *   delete:
 *     tags:
 *       - Carts
 *     description: Delete an item from a cart (for a logged-in user)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: cart_id
 *         description: The id of the cart from which the product is to be deleted
 *         in: body
 *         required: true
 *         example: { cart_id: 1 }
 *       - name: product_id
 *         description: The id of a product to be deleted from a cart
 *         in: body
 *         required: true
 *         example: { cart_id: 1 }
 *     responses:
 *       204:
 *         description: Item successfully deleted
 */

cartsRouter.delete("/:id", checkAuth, async (req, res, next) => {
  try {
    const { cart_id, product_id } = req.body;
    await deleteProductFromCart(cart_id, product_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = cartsRouter;

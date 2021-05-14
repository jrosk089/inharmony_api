const express = require("express");
const cartsRouter = express.Router({ mergeParams: true });
const {
  getAllCarts,
  getCartById,
  addCart,
  addProductIntoCart,
  deleteProductFromCart,
} = require("../util/knexQueries");

cartsRouter.param("id", async (req, res, next, id) => {
  if (isNaN(parseInt(id))) {
    return res.status(404).send();
  }

  const cart = await getCartById(id);

  if (!cart || !cart.length) {
    return res.status(404).send();
  }
  req.cart = cart;
  next();
});

cartsRouter.get("/", async (req, res, next) => {
  try {
    const carts = await getAllCarts();
    res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
});

cartsRouter.get("/:id", async (req, res, next) => {
  try {
    res.status(200).json(req.cart);
  } catch (err) {
    next(err);
  }
});

cartsRouter.post("/", async (req, res, next) => {
  if (
    !req.body.hasOwnProperty("user_id") ||
    !req.body.hasOwnProperty("product_ids") ||
    !req.body.product_ids.length
  ) {
    return res.status(400).send();
  }
  try {
    const cartId = await addCart(req.body);
    res.status(201).json({ cart_id: cartId });
  } catch (err) {
    next(err);
  }
});

cartsRouter.post("/:id", async (req, res, next) => {
  try {
    const { cart_id, product_id } = req.body;
    const addedProduct = await addProductIntoCart(cart_id, product_id);
    res.status(201).json(addedProduct);
  } catch (err) {
    next(err);
  }
});

cartsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { cart_id, product_id } = req.body;
    await deleteProductFromCart(cart_id, product_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = cartsRouter;

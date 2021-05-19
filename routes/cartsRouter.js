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

cartsRouter.get("/", checkAuth, async (req, res, next) => {
  try {
    const carts = await getCartsForUser(req.user.user_id);
    res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
});

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

cartsRouter.post("/:id", checkAuth, async (req, res, next) => {
  try {
    const { cart_id, product_id } = req.body;
    const addedProduct = await addProductIntoCart(cart_id, product_id);
    res.status(201).json(addedProduct);
  } catch (err) {
    next(err);
  }
});

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

const express = require("express");
const productsRouter = express.Router({ mergeParams: true });
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../util/knexQueries");

productsRouter.param("id", async (req, res, next, id) => {
  if (isNaN(parseInt(id))) {
    return res.status(404).send();
  }

  const product = await getProductById(id);
  if (product) {
    req.product = product;
    next();
  } else {
    res.status(404).send();
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

productsRouter.get("/:id", (req, res, next) => {
  res.status(200).json(req.product);
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const productToAdd = await addProduct(req.body);
    const addedProduct = await getProductById(productToAdd);
    res.status(201).json(addedProduct);
  } catch (err) {
    next(err);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  if (req.body.hasOwnProperty("product_id")) {
    return res.status(422).json({
      error: "ID cannot be updated",
    });
  }
  try {
    const productToUpdate = await updateProduct(req.params.id, req.body);
    const updatedProduct = await getProductById(productToUpdate);
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res
      .status(200)
      .json({ message: `Product with id ${req.params.id} deleted` });
  } catch (err) {
    next(err);
  }
});

module.exports = productsRouter;

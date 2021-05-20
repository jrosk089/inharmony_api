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

/**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       product_id:
 *         type: integer
 *       name:
 *         type: string
 *       category:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: number
 *         format: decimal
 *       num_in_stock:
 *         type: integer
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns all products
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of all products
 *         schema:
 *           $ref: '#/definitions/Product'
 */

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns a single product
 *     parameters:
 *       name: id
 *       description: Product id
 *       in: path
 *       required: true
 *       type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An object with information about one product
 *         schema:
 *           $ref: '#/definitions/Product'
 */

productsRouter.get("/:id", (req, res, next) => {
  res.status(200).json(req.product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     description: Creates a new product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Product name
 *         in: body
 *         required: true
 *         example: prodname
 *       - name: category
 *         description: Product category
 *         in: body
 *         required: true
 *         example: prodcat
 *       - name: description
 *         description: Product description
 *         in: body
 *         required: false
 *         example: A description of this fine product
 *       - name: price
 *         description: Product price
 *         in: body
 *         required: true
 *         example: 1200.00
 *       - name: num_in_stock
 *         description: Number in stock
 *         in: body
 *         required: true
 *         example: 10
 *     responses:
 *       201:
 *         description: ID of successfully created product
 *         schema:
 *           product_id:
 *             type: integer
 *           example: { product_id: 12 }
 */

productsRouter.post("/", async (req, res, next) => {
  try {
    const productToAdd = await addProduct(req.body);
    const addedProduct = await getProductById(productToAdd);
    res.status(201).json(addedProduct);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     description: Updates a product
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: Parameters to update
 *         schema:
 *           enum: [name, category, price, num_in_stock]
 *           example: { name: newname, price: 100.51 }
 *     responses:
 *       201:
 *         description: ID of successfully updated product
 *         schema:
 *           product_id:
 *             type: integer
 *           example: { product_id: 4 }
 *       422:
 *         description: ID was included in parameter to update, which is not allowed
 *         schema:
 *           error:
 *             type: string
 *           example: ID cannot be updated
 *
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     description: Delete a product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product_id
 *         description: The id of the product to be deleted
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success message
 *         schema:
 *           message:
 *             type: string
 *           example: Product with id 4 deleted
 */

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

const express = require('express');
const productsRouter = express.Router({ mergeParams: true });
const { getProducts, getProductsById, addProduct } = require('../util/queries');

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductsById);

productsRouter.post('/', addProduct);

module.exports = productsRouter;
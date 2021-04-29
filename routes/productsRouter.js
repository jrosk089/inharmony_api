const express = require('express');
const { getProducts, getProductsById } = require('../util/queries');

const productsRouter = express.Router({ mergeParams: true });

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductsById);

module.exports = productsRouter;
const express = require('express');
const productsRouter = express.Router({ mergeParams: true });
const { getProducts, 
        getProductsById, 
        addProduct,
        updateProductById } = require('../util/queries');

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductsById);

productsRouter.post('/', addProduct);

productsRouter.put('/:id', updateProductById);

module.exports = productsRouter;
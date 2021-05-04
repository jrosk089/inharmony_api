const express = require('express');
const productsRouter = express.Router({ mergeParams: true });
/*

DELETE THIS SECTION IF KNEX TURNS OUT TO BE SUPER COOL


const { getProducts, 
        getProductsById, 
        addProduct,
        updateProductById } = require('../util/queries');
        
*/
const queries = require('../util/knexQueries'); 

productsRouter.get('/', async (req, res, next) => {
        try {
        const products = await queries.getAll();
        res.status(200).json(products); 
        } catch(err) { next(err) }
});

/*
productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductsById);

productsRouter.post('/', addProduct);

productsRouter.put('/:id', updateProductById);*/

module.exports = productsRouter;
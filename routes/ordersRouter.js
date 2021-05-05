const express = require('express');
const ordersRouter = express.Router({ mergeParams: true });
const { getOrders } = require('../util/pgQueries');

ordersRouter.get('/', getOrders);

module.exports = ordersRouter;
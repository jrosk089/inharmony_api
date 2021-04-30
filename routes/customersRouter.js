const express = require('express');
const customersRouter = express.Router({ mergeParams: true });
const { getCustomers, getCustomersById } = require('../util/queries');

customersRouter.get('/', getCustomers);

customersRouter.get('/:id', getCustomersById);

module.exports = customersRouter;

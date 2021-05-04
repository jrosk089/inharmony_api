const knex = require('../db/knex');

const Products = () => knex('products');

const getAll = () => Products().select();

module.exports = {
    getAll
}
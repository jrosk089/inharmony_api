const knex = require("../db/knex");

const Products = () => knex("products");

const getAllProducts = () => Products().select();

const getProductById = (productId) =>
  Products().where("product_id", parseInt(productId)).first();

const addProduct = (product) => Products().insert(product, "product_id");

const updateProduct = (productId, updates) =>
  Products().where("product_id", parseInt(productId)).update(updates);

const deleteProduct = (productId) =>
  Products().where("product_id", parseInt(productId)).del();

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

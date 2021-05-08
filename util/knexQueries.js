const knex = require("../db/knex");

//PRODUCTS

const Products = () => knex("products");

const getAllProducts = () => Products().select();

const getProductById = (productId) =>
  Products().where("product_id", parseInt(productId)).first();

const addProduct = (product) => Products().insert(product, "product_id");

const updateProduct = (productId, updates) =>
  Products()
    .where("product_id", parseInt(productId))
    .update(updates, "product_id");

const deleteProduct = (productId) =>
  Products().where("product_id", parseInt(productId)).del();

//USERS

const Users = () => knex("users");

const getAllUsers = () => Users().select();

const getUserById = (userId) => Users().where("user_id", userId).first();

const addUser = (user) => Users().insert(user, "user_id");

const updateUser = (userId, updates) =>
  Users().where("user_id", userId).update(updates, "user_id");

const deleteUser = (userId) => Users().where("user_id", userId).del();

module.exports = {
  //products
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  //users
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};

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

//ORDERS

const Orders = () => knex("orders AS o");

//return order id, user id, number of items in order and total price of order

const getAllOrders = () =>
  Orders()
    .select("o.order_id", "u.user_id")
    .count("p.name AS num_items")
    .sum("p.price AS total_price")
    .join("users AS u", "o.user_id", "u.user_id")
    .join("orders_products AS op", "o.order_id", "op.order_id")
    .join("products AS p", "op.product_id", "p.product_id")
    .groupBy(1, 2)
    .orderBy(1, "ASC");

const getOrderById = (orderId) =>
  Orders()
    .where("o.order_id", orderId)
    .select(
      "o.order_id",
      "u.user_id",
      "p.name AS product_name",
      "p.price AS unit_price"
    )
    .count("p.description AS num_units")
    .join("users AS u", "o.user_id", "u.user_id")
    .join("orders_products AS op", "o.order_id", "op.order_id")
    .join("products AS p", "op.product_id", "p.product_id")
    .groupBy(1, 2, 3, 4)
    .orderBy(3, "ASC");

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
  //orders
  getAllOrders,
  getOrderById,
};

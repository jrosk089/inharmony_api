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

const Orders = () => knex("orders");

//need to respond with a table with at least user_id, order_id and product names in the order

const getAllOrders = () =>
  Users()
    .select("users.user_id", "orders.order_id")
    .count("products.name AS num_items")
    .sum("products.price AS total_price")
    .join("orders", "users.user_id", "orders.user_id")
    .join("orders_products", "orders.order_id", "orders_products.order_id")
    .join("products", "orders_products.product_id", "products.product_id")
    .groupBy(1, 2);

const getOrderById = (orderId) =>
  Orders().where("order_id", parseInt(orderId)).first();

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

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

const addUser = async (user) => {
  const userId = await Users().insert(user, "user_id");
  return userId[0];
};

const updateUser = async (userId, updates) => {
  const updatedId = await Users()
    .where("user_id", userId)
    .update(updates, "user_id");
  return updatedId[0];
};

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

//CARTS

const Carts = () => knex("carts AS c");

//return cart id, user id, number of items in cart and total price of cart

const getAllCarts = () =>
  Carts()
    .select("c.cart_id", "u.user_id")
    .count("p.name AS num_items")
    .sum("p.price AS total_price")
    .join("users AS u", "c.user_id", "u.user_id")
    .join("carts_products AS cp", "c.cart_id", "cp.cart_id")
    .join("products AS p", "cp.product_id", "p.product_id")
    .groupBy(1, 2)
    .orderBy(1, "ASC");

const getCartById = (cartId) =>
  Carts()
    .where("c.cart_id", cartId)
    .select(
      "c.cart_id",
      "u.user_id",
      "p.name AS product_name",
      "p.price AS unit_price"
    )
    .count("p.description AS num_units")
    .join("users AS u", "c.user_id", "u.user_id")
    .join("carts_products AS cp", "c.cart_id", "cp.cart_id")
    .join("products AS p", "cp.product_id", "p.product_id")
    .groupBy(1, 2, 3, 4)
    .orderBy(3, "ASC");

const addCart = async (cart) => {
  const { user_id, product_ids } = cart;
  const cartId = await Carts().insert({ user_id: user_id }, "cart_id");

  product_ids.forEach(async (productId) => {
    await knex("carts_products").insert({
      product_id: productId,
      cart_id: cartId[0],
    });
  });

  return cartId[0];
};

const addProductIntoCart = async (cartId, productId) => {
  const addedIds = await knex("carts_products").insert(
    { cart_id: cartId, product_id: productId },
    ["cart_id", "product_id"]
  );
  return addedIds[0];
};

const deleteProductFromCart = (cartId, productId) =>
  knex("carts_products")
    .where({ cart_id: cartId, product_id: productId })
    .del();

//CHECKOUT - INSERT USER_ID INTO ORDERS TO CREATE NEW ORDER

const createOrderFromCart = async (cartId) => {
  //Get user_id from cart and create a new order with it
  const userId = await Carts().where("cart_id", cartId).select("user_id");
  return Orders().insert({ user_id: userId[0].user_id }, "order_id");
};

const getProductsFromCart = async (cartId) =>
  knex("carts_products").where("cart_id", cartId).select("product_id");

const addProductsToOrder = (orderId, productArr) => {
  //For each product in the array, add its id (with order_id) to orders_products
  productArr.forEach(async (product) => {
    const addedId = await knex("orders_products").insert(
      {
        order_id: orderId,
        product_id: product.product_id,
      },
      "id"
    );
  });
};

const deleteProductsFromCart = (cartId) =>
  knex("carts_products").where("cart_id", cartId).del();

const checkout = async (cartId) => {
  const orderId = await createOrderFromCart(cartId);
  const products = await getProductsFromCart(cartId);
  await addProductsToOrder(orderId[0], products);
  await deleteProductsFromCart(cartId);
  return orderId[0];
};

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
  //carts
  getAllCarts,
  getCartById,
  addCart,
  addProductIntoCart,
  deleteProductFromCart,
  //checkout
  checkout,
};

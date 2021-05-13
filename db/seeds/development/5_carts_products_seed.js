exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("carts_products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("carts_products").insert([
        { cart_id: 1, product_id: 2 },
        { cart_id: 1, product_id: 3 },
        { cart_id: 1, product_id: 1 },
        { cart_id: 2, product_id: 2 },
        { cart_id: 2, product_id: 1 },
        { cart_id: 2, product_id: 1 },
        { cart_id: 3, product_id: 3 },
        { cart_id: 3, product_id: 3 },
        { cart_id: 3, product_id: 2 },
      ]);
    });
};

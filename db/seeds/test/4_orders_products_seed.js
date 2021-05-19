exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orders_products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orders_products").insert([
        { order_id: 1, product_id: 2 },
        { order_id: 1, product_id: 3 },
        { order_id: 1, product_id: 1 },
        { order_id: 2, product_id: 2 },
        { order_id: 2, product_id: 1 },
        { order_id: 2, product_id: 1 },
        { order_id: 3, product_id: 3 },
        { order_id: 3, product_id: 3 },
        { order_id: 3, product_id: 2 },
        { order_id: 4, product_id: 3 },
        { order_id: 4, product_id: 2 },
        { order_id: 5, product_id: 1 },
      ]);
    });
};

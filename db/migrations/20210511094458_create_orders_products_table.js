exports.up = function (knex) {
  return knex.schema.createTable("orders_products", (table) => {
    table.increments("id");
    table
      .integer("order_id")
      .references("order_id")
      .inTable("orders")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("product_id")
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders_products");
};

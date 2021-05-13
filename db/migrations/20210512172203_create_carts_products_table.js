exports.up = function (knex) {
  return knex.schema.createTable("carts_products", (table) => {
    table.increments("id");
    table
      .integer("cart_id")
      .references("cart_id")
      .inTable("carts")
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
  return knex.schema.dropTable("carts_products");
};

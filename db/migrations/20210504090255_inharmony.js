exports.up = function (knex, Promise) {
  return knex.schema.createTable("products", (table) => {
    table.increments("product_id");
    table.string("name").notNullable();
    table.string("category").notNullable();
    table.string("description");
    table.decimal("price", 8, 2).notNullable();
    table.integer("num_in_stock").notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("products");
};

exports.up = (knex) => {
  return knex.schema.createTable("products", (table) => {
    table.increments("product_id");
    table.string("name", [50]).notNullable();
    table.string("category", [50]).notNullable();
    table.text("description");
    table.decimal("price", 8, 2).notNullable();
    table.integer("num_in_stock").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};

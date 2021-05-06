exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("products", (table) => {
      table.increments("product_id");
      table.string("name").notNullable();
      table.string("category").notNullable();
      table.string("description");
      table.decimal("price", 8, 2).notNullable();
      table.integer("num_in_stock").notNullable();
    })
    .createTable("users", (table) => {
      table.uuid("user_id").primary();
      table.string("email").notNullable();
      table.string("last_name").notNullable();
      table.string("first_name").notNullable();
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("products").dropTable("users");
};

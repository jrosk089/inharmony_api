exports.up = (knex) => {
  return knex.schema.createTable("carts", (table) => {
    table.increments("cart_id");
    table
      .uuid("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("carts");
};

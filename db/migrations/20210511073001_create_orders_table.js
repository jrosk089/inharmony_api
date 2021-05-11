exports.up = async (knex) => {
  return knex.schema.createTable("orders", (table) => {
    table.increments("order_id");
    table
      .uuid("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};

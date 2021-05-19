exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("users", (table) => {
    table.uuid("user_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("last_name").notNullable();
    table.string("first_name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

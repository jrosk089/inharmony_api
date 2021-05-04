
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('products', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('family').notNullable();
      table.string('description');
      table.decimal('price', 8, 2).notNullable();
      table.integer('num_in_stock').notNullable();
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('products');
};

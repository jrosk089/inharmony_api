
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(() => {
      // Inserts seed entries
      return knex('products').insert({
        name: 'testname1', family: 'testfam1', description: 'descript1', price: 400.00, num_in_stock: 1
      })
    })
    .then(() => {
      return knex('products').insert({
        name: 'testname2', family: 'testfam2', description: 'descript2', price: 600.00, num_in_stock: 2
      })
    })
    .then(() => {
      return knex('products').insert({
        name: 'testname3', family: 'testfam3', description: 'descript3', price: 800.00, num_in_stock: 3
      })
    })
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("products").insert({
        name: "testname1",
        category: "testcat1",
        description: "descript1",
        price: 400.0,
        num_in_stock: 1,
      });
    })
    .then(() => {
      return knex("products").insert({
        name: "testname2",
        category: "testcat2",
        description: "descript2",
        price: 600.0,
        num_in_stock: 2,
      });
    })
    .then(() => {
      return knex("products").insert({
        name: "testname3",
        category: "testcat3",
        description: "descript3",
        price: 800.0,
        num_in_stock: 3,
      });
    });
};

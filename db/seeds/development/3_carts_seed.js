exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("carts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("carts").insert({
        user_id: "123e4567-e89b-12d3-a456-426614174001",
      });
    })
    .then(function () {
      // Inserts seed entries
      return knex("carts").insert({
        user_id: "123e4567-e89b-12d3-a456-426614174002",
      });
    })
    .then(function () {
      // Inserts seed entries
      return knex("carts").insert({
        user_id: "123e4567-e89b-12d3-a456-426614174003",
      });
    });
};

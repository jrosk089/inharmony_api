exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("users").insert({
        user_id: "123e4567-e89b-12d3-a456-426614174001",
        email: "email1@email.com",
        password: "password1",
        last_name: "lastname1",
        first_name: "firstname1",
      });
    })
    .then(function () {
      return knex("users").insert({
        user_id: "123e4567-e89b-12d3-a456-426614174002",
        email: "email2@email.com",
        password: "password2",
        last_name: "lastname2",
        first_name: "firstname2",
      });
    })
    .then(function () {
      return knex("users").insert({
        user_id: "123e4567-e89b-12d3-a456-426614174003",
        email: "email3@email.com",
        password: "password3",
        last_name: "lastname3",
        first_name: "firstname3",
      });
    });
};

const { userMaker } = require("../../../util/makers");
const bcrypt = require("bcryptjs");

const userArray = userMaker();

const generatePassword = (password) => bcrypt.hash(password, 10);

userArray.forEach(async (user) => {
  user.password = await generatePassword(user.password);
});

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("users").del();

  return knex("users").insert(userArray);
};

const { productMaker } = require("../../../util/makers");

const productArray = productMaker();

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("products").del();

  return knex("products").insert(productArray);
};

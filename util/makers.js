const products = require("./products");
const faker = require("faker");

const productMaker = () => {
  const productArray = [];

  const categories = Object.keys(products);
  categories.forEach((category) => {
    const names = Object.keys(products[category]);

    names.forEach((name) => {
      const { description, price, num_in_stock } = products[category][name];

      productArray.push({
        name,
        category,
        description,
        price,
        num_in_stock,
      });
    });
  });
  return productArray;
};

const userMaker = () => {
  const userArray = [];
  for (let i = 0; i < 10; i++) {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const last_name = faker.name.lastName();
    const first_name = faker.name.firstName();
    userArray.push({
      email,
      password,
      last_name,
      first_name,
    });
  }
  userArray.push({
    email: "example@email.com",
    password: "password",
    last_name: "Ample",
    first_name: "Ex",
  });
  return userArray;
};

module.exports = { productMaker, userMaker };

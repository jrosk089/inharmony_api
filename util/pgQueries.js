const Pool = require("pg").Pool;

/*


PLEASE NOTE:
This file was the first attempt to write queries, which went very well,
but then I found Knex and was like "Oooooh" so I decided to switch to that.
This is left here because I worked hard on it and it's all usable stuff.


*/

//check if testing environment - if so, use test database; otherwise, use actual database
const database =
  process.env.NODE_ENV === "test" ? "inharmony_api_test" : "inharmony_api";

const pool = new Pool({
  user: "jon",
  host: "localhost",
  database: database,
  port: 5432,
});

//products
const getProducts = (req, res) => {
  pool.query("SELECT * FROM products", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

const getProductsById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM products WHERE product_id = $1",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    }
  );
};

const addProduct = (req, res) => {
  const keys = ["name", "family", "description", "price", "num_in_stock"];
  const missing = [];

  keys.forEach((key) => {
    if (!req.body.hasOwnProperty(key)) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    res.status(400).send(`Missing values from request: ${missing}`);
  } else {
    const { name, category, description, price, num_in_stock } = req.body;

    pool.query(
      "INSERT INTO products (name, category, description, price, num_in_stock) VALUES ($1, $2, $3, $4, $5);",
      [name, category, description, price, num_in_stock],
      (err, result) => {
        if (err) {
          throw err;
        }

        res.status(201).send(`Created entry for ${name}`);
      }
    );
  }
};

const updateProductById = (req, res) => {
  const id = req.params.id;

  const { name, category, description, price, num_in_stock } = req.body;

  pool.query(
    "UPDATE products SET name = $1, family = $2, description = $3, price = $4, num_in_stock = $5 WHERE product_id = $6;",
    [name, category, description, price, num_in_stock, id],
    (err, result) => {
      if (err) {
        throw err;
      }

      res.status(200).send({
        name: name,
        category: category,
        description: description,
        price: price,
        num_in_stock: num_in_stock,
      });
    }
  );
};

//users
const getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

const getUsersById = (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * FROM users WHERE user_id = $1", [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

const addUser = (req, res) => {
  const keys = ["last_name", "first_name", "email"];
  const missing = [];

  keys.forEach((key) => {
    if (!req.body.hasOwnProperty(key)) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    res.status(400).send(`Missing values from request: ${missing}`);
  } else {
    const { last_name, first_name, email } = req.body;

    pool.query(
      `INSERT INTO users (last_name, first_name, email) VALUES ($1, $2, $3)`,
      [last_name, first_name, email],
      (err, result) => {
        if (err) {
          throw err;
        }

        res.status(201).send(`Created entry for ${last_name}, ${first_name}`);
      }
    );
  }
};

// Orders

const getOrders = (req, res) => {
  pool.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

module.exports = {
  getProducts,
  getProductsById,
  addProduct,
  updateProductById,
  getUsers,
  getUsersById,
  addUser,
  getOrders,
};

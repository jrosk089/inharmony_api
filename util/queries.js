const Pool = require('pg').Pool;

//check if testing environment - if so, use test database; otherwise, use actual database
const database = process.env.NODE_ENV === 'test' ? 'inharmony_api_test' : 'inharmony_api';

const pool = new Pool({
    user: 'jon',
    host: 'localhost',
    database: database,
    port: 5432
});


//products
const getProducts = (req, res) => {
    pool.query('SELECT * FROM products', (err, result) => {
        if (err){
            throw err
        };
        res.status(200).json(result.rows)
    })
};

const getProductsById = (req, res) => {
    const id = parseInt(req.params.id);
    
    pool.query('SELECT * FROM products WHERE product_id = $1', [id], (err, result) => {
        if (err){
            throw err
        };
        res.status(200).json(result.rows)
    })
};

const addProduct = (req, res) => {
    const keys = ['name', 'family', 'description', 'price', 'num_in_stock'];
    const missing = [];

    keys.forEach(key => {
        if (!req.body.hasOwnProperty(key)){
            missing.push(key)
        }
    });
    
    if (missing.length > 0){
        res.status(400).send(`Missing values from request: ${missing}`)
    } else {
        const {name, family, description, price, num_in_stock} = req.body;

        pool.query(`INSERT INTO products (name, family, description, price, num_in_stock) VALUES ($1, $2, $3, $4, $5)`, 
        [name, family, description, price, num_in_stock], 
        (err, result) => {
            if (err){
                throw err
            };
            
            res.status(201).send(`Created entry for ${name}`)
        })
    }   
};

//users
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (err){
            throw err
        };
        res.status(200).json(result.rows);
    })
};

const getUsersById = (req, res) => {
    const id = req.params.id;

    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (err, result) => {
        if (err){
            throw err
        };
        res.status(200).json(result.rows)
    })
};

const addUser = (req, res) => {
    const keys = ['last_name', 'first_name', 'email'];
    const missing = [];

    keys.forEach(key => {
        if(!req.body.hasOwnProperty(key)){
            missing.push(key)
        }
    });

    if (missing.length > 0){
        res.status(400).send(`Missing values from request: ${missing}`)
    } else {
        const { last_name, first_name, email } = req.body;

        pool.query(`INSERT INTO users (last_name, first_name, email) VALUES ($1, $2, $3)`, 
        [last_name, first_name, email], 
        (err, result) => {
            if (err){
                throw err
            };
            
            res.status(201).send(`Created entry for ${last_name}, ${first_name}`)
        })
    }
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    getUsers,
    getUsersById,
    addUser
};
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'jon',
    host: 'localhost',
    database: 'inharmony_api',
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
    
    pool.query('SELECT * FROM products WHERE id = $1', [id], (err, result) => {
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

//customers
const getCustomers = (req, res) => {
    pool.query('SELECT * FROM customers', (err, result) => {
        if (err){
            throw err
        };
        res.status(200).json(result.rows);
    })
};

const getCustomersById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM customers WHERE ID = $1', [id], (err, result) => {
        if (err){
            throw err
        };
        res.status(200).json(result.rows)
    })
}

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    getCustomers,
    getCustomersById
};
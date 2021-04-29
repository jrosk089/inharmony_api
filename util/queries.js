const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'jon',
    host: 'localhost',
    database: 'inharmony_api',
    port: 5432
});

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

module.exports = {
    getProducts,
    getProductsById
};
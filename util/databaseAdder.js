const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'jon',
    host: 'localhost',
    database: 'inharmony_api',
    port: 5432
});

const itemMaker = require('./itemMaker');

const family = process.argv[2];
const instrument = process.argv[3];

const itemArr = itemMaker(family, instrument);

itemArr.forEach(item => {
    const {name, description, price, num_in_stock} = item; 
    
    pool.query(`INSERT INTO products (name, family, description, price, num_in_stock) VALUES ('${name}', '${family}', '${description}', ${price}, ${num_in_stock})`);
});


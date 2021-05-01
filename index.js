const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');


//use bodyParser and morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(morgan('tiny'));

//import & mount productsRouter
const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter);

//import & mount usersRouter

const usersRouter = require('./routes/usersRouter');
app.use('/users', usersRouter);

//import & mount ordersRouter


//Create server
const port = 3000;

if(process.env.NODE_ENV === 'test'){
    console.log('testing')
};

app.listen(port, () => {
    console.log('App listening at http://localhost:' + port)
});

module.exports = app;

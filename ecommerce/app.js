const express = require('express');
const app = express();
const colors = require('colors');

app.use(express.json());

const products = require('./routes/product');


app.use('/api/v1/',products)


module.exports = app;
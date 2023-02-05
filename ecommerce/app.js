const express = require('express');
const app = express();
const colors = require('colors');
const errorMiddleWare = require('./middlewares/error');

app.use(express.json());

const products = require('./routes/product');
const auth = require('./routes/auth');


app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use(errorMiddleWare)



module.exports = app;
const express = require('express');
const app = express();
const colors = require('colors');
const errorMiddleWare = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// Set up CORS
app.use(cors({
    origin: "*"
}));





app.use(express.json());

app.use(cookieParser());

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use(errorMiddleWare)



module.exports = app;
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



const products = require('./routes/product');
const auth = require('./routes/auth');

app.use(express.json());

app.use(cookieParser());


app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use(errorMiddleWare)



module.exports = app;
const products = require ('../data/products.json');
const product =require ('../models/productModel');
const connectDatabase = require('../config/database')

require('dotenv').config({ path:"config/config.env" });
connectDatabase();

const seedProduct= async()=>{
    try{
        await product.deleteMany();
        console.log("product deleted");
        await product.insertMany(products)
     console.log("product added");
    }catch(error){
console.log(error.message);
    }
    process.exit();

}

seedProduct();
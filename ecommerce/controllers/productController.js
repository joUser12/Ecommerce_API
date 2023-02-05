const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAyncError');
const APIFeatures = require ('../utils/apiFeature');

// get all Products - /api/v1/product
exports.getProducts = catchAsyncError( async (req,res,next)=>{
    const apiFeatures = new APIFeatures (Product.find(),req.query).search().filter();
    const product = await  apiFeatures.query;
    // const product = await  Product.find()
    res.status(200).json({
        success:true,
        count:product.length,
        data:product
    })
});

// create product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req,res,next)=>{

    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        data:product
   
    })
});

// get Single product- /api/v1/product/id

exports.getSingleProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    // if(!product){
    //     return  res.status(404).json({
    //           success:false,
    //           data:"product not found"
    //       })
    //   }
      if(!product){
       return next(new ErrorHandler('product not found',400))
      }
   
    res.status(200).json({
        success:true,
        data:product
    })
}

// update product -/api/v1/product/id

exports.updateProduct = async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
      return  res.status(404).json({
            success:false,
            data:"product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,
        {
            new:true,
            runValidators:true
        })
    res.status(200).json({
        success:true,
        data:product
    })
}

// delete product -/api/v1/product/id

exports.deleteProduct = async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
      return  res.status(404).json({
            success:false,
            data:"product not found"
        })
    }

    await product.remove();
    res.status(200).json({
        success:true,
        data:"product removed"
    })
}


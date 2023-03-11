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
    // req.body.user = req.user.id
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

// Create Review -api/v1/review

exports.createReview = catchAsyncError(async (req,res,next)=>{
    const {productId,rating,comment}= req.body;

    const review = {
        user:req.user.id,
        rating,
        comment
    }
// finding user review exist
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(reviews=>{
        return review.user.toString() == req.user.id.toString()
    });

    if(isReviewed){
        // updating review
        product.reviews.forEach(review=>{
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating

            }
        })

    }else{
        // add review
        product.reviews.push(review);
        product.numOFReviews  = product.reviews.length;
    }
    // console.log(product);
// find average product rating 
    product.ratings = product.reviews.reduce((acc,review)=>{
        return review .rating + acc
    },0)/product.reviews.length;
    console.log(product);
    product.ratings = isNaN (product.ratings) ? 0 : product.ratings;

    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true
    })
})

// Get Review - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req,res,next )=>{
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

// delete Review -api/v1/review

exports.deleteReview = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);
// filtering the reviews which does match deleting review id
    const reviews = product.reviews.filter(review=>{
        return review._id.toString() !== req.query.id.toString();

   
    })
    // number of reviews
    const numOFReviews= reviews.length;
// finding the average with filter reviews
    let ratings = reviews.reduce((acc,review)=>{
        return review .rating + acc
    },0)/reviews.length;
    ratings = isNaN(ratings) ? 0 :ratings;
    // update
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        numOFReviews,ratings
    })
    res.status(200).json({
        success:true
    })
})


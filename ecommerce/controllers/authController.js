const catchAsyncError = require('../middlewares/catchAyncError');
const User = require('../models/userModel');
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require ('../utils/jwt');

exports.registerUser = catchAsyncError (async(req,res,next)=>{
    const {name ,email,password,avatar} = req.body

    const user = await User.create({
        name,email,password,avatar
    });
    const token = user.getJwtToken()
    res.status(201).json({
        success:true,
        user,
        token
    })
});


exports.loginUser = catchAsyncError (async(req,res,next)=>{
    const {email,password} = req.body

    if(!email || !password ){
        return next (new ErrorHandler('please enter email & password',400))
    }
    // finding the user
    const user =  await User.findOne({email}).select('+password')
    if(!user){
        return next (new ErrorHandler('Invalid email or password',401))
    }
    if(! await user.isValidPassword(password)){
     return next (new ErrorHandler('Invalid email or password',401))
    }
    sendToken(user,201,res)
});


exports.logoutUser = (req,res,next) =>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    .status(200).json({
        success :true,
        message :"loggedout"
    })

}
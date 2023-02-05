const { hash } = require('bcrypt');
const mongoose = require('mongoose');
const  validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name']
    },
    email :{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        validate:[validator.isEmail,'please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        maxlength:[6,'password cannot exceed 6 characters'],
        select:false
    },
    avatar:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now()
    }

    
});

userSchema.pre ('save',async function(next){
    this.password =await bcrypt.hash(this.password,10)
})
userSchema.methods.getJwtToken = function (){
return  jwt.sign({id:this.id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_TIME
})}

userSchema.methods.isValidPassword = async function(enteredPassword){
 return await bcrypt.compare(enteredPassword,this.password)

}

userSchema.methods.resetPassword = function (){
    // Generate Token
   const token = crypto.randomBytes(20).toString('hex');
//    Gnerate Hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('dfjk455').update(token);

// set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30* 60* 1000;

     return token
};

let model=mongoose.model('User',userSchema)
module.exports=model;
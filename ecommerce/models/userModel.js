const { hash } = require('bcrypt');
const mongoose = require('mongoose');
const  validator = require('validator');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

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
    resetPasswordTokenEspire:Date,
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
})
}

let model=mongoose.model('User',userSchema)
module.exports=model;
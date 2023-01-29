const mongoose = require ('mongoose');
// const dotenv = require('dotenv');

require('dotenv').config({ path:"config/config.env" });
const connectDatabase =()=>{
     mongoose.connect(process.env.LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then ((res)=>{
        console.log(`mongoDb is connected to cluster `.bgGreen.bold);
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports= connectDatabase
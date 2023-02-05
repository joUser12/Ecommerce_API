const mongoose = require ('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxLength:[100,"product name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"product enter product description"]
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product category "],
        enum:{
            values:[
                'Electronis',
                'Mobile Phones',
                'Headphones',
                'Food',
                'Books',
                'Clothes/shoes',
                'Sports',
                'Outdoor'
            ],
            message:"please enter correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"please enter product seller"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[20,"product stock cannot exceed 20"]
    },
    numOFReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

let schema=mongoose.model('product',productSchema);
module.exports =schema;
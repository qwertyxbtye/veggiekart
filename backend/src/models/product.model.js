const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    weight:{
        type: String,
        enum: ['1', '250', '500']
    },
    category:{
        type: String,
        enum: ["kg", "piece", "gm", "dozen"]
    },
    price:{
        type: Number,
        required: true
    },
    img:{
        type: String,
        required: true,
        default:'/Users/rohitmaity/Documents/project/e comerce app/backend/images/veggies.jpeg'
    }, 
    isAvailable:{
        type: Boolean,
        required: true,
        default:true
    }
})

const PRODUCT = mongoose.model('product',productSchema)

module.exports = PRODUCT
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    items:[
        { product:{type:mongoose.Schema.Types.ObjectId, ref:'product'},quantity: {type:Number, required:true} }  
    ],
    delivery_address:{
        type:String,
        required:true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["Placed","Out for delivery", "Delivered", "Cancelled"],
        default: 'Placed'
    },
    payment_status:{
        type: String,
        enum: ["Cash on Delivery", "Paid"],
        default:'Cash on Delivery'
    },
    
}, { timestamps : true } );

const ORDER = mongoose.model('order',orderSchema)

module.exports = ORDER
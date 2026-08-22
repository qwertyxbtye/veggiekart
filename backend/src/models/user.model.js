const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    img:{
        type: String,
        required:true,
        default: '/Users/rohitmaity/Documents/project/e comerce app/backend/images/user.png',
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ['user','vendor'],
        default: 'user'
    },
    address:{
        type: String,
        required: true
    }, 
    phone:{
        type: Number,
        required: true
    },
    bag:[ 
        {
            product:{type:mongoose.Schema.Types.ObjectId, ref:'product'},
            quantity:{ type:Number , required:true, default: 1}
        }
    ]
})

const USER = mongoose.model('user',userSchema)

module.exports = USER
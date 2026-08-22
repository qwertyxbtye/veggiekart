const jwt = require('jsonwebtoken')
const USER = require('../models/user.model')



async function checkLoginStatus(req,res,next) {
    
    const token = req.cookies.token
    
    if(!token) return res.send('plz Login')

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if(!payload) res.send('please login')

    const user = await USER.findOne({_id:payload.id})
    
    if(!user) res.send('user not found')

    req.user = user
    next()
}


function checkAuthorization(roles) {
    
    return function(req,res,next) {

        const user = req.user
        if(!user) res.send('user not found')

        if(!roles.includes(user.role)) return res.status(400).send('Unauthorized')

        next()

    }
}

module.exports = {checkAuthorization,checkLoginStatus}
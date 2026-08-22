const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const USER = require('../models/user.model')
const getImageUrl = require('../services/imagekit')
const fs = require('fs')


async function handleUserRegistration(req,res) {
    
    const user = req.body
    const imgfile = req.file

    if(!user || !imgfile) return res.send('please enter user details correctly')

    const imgdetails = await getImageUrl(imgfile)

    if(!imgdetails) return res.send('imagekit error')

    await fs.unlink(req.file.path, err => {
        if(err) console.log(err);
        console.log('file deleted');  
    })

    const {name,email,password,role,phone,address} = user

    const hashedpass = await bycrypt.hash(password,10)
    
    try {

        const userdetails = await USER.create({
        name,email,password: hashedpass,role,phone,address,img: imgdetails.url
        })

        const token = jwt.sign( {id:userdetails._id} , process.env.JWT_SECRET)
        res.cookie('token',token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(201).json({ msg: name + " registered successfully.", user: userdetails})

    } catch (error) {
        res.send(error)
    }
 
}

async function handleUserLogin(req,res) {

    const {email,password} = req.body 
    if(!email || !password) res.json({mag:'user not found'})

    console.log('email',email);
    

    const user = await USER.findOne({email})

    if(!user) return res.json({mag:'user not found'})
    
    console.log('user',user);
    

    const ispassCorrect = await bycrypt.compare(password,user.password)
    console.log('ispassCorrect',ispassCorrect);
    if(!ispassCorrect) return res.json({msg:'password is not correct'})
        
    

    
    

    const token = jwt.sign( {id:user._id} , process.env.JWT_SECRET)
    res.cookie('token',token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(201).json({ msg: user.name + " logged in successfully.", user})
}

async function handleUserLogout(req,res) {

    const token = req.cookies.token
    console.log(token);
    
    if(!token) return res.json({ msg: "Please login."})

    const payload = jwt.verify(token,process.env.JWT_SECRET)
    console.log('payload',payload);
    
    
    const user = await USER.findOne({_id: payload.id})

    res.clearCookie('token')

    res.status(201).json({ msg: user.name + " logged out successfully.", user})
}

module.exports = { handleUserRegistration,handleUserLogin,handleUserLogout}
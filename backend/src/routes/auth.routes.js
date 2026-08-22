const express = require('express')
const {handleUserRegistration,handleUserLogin,handleUserLogout} = require('../controllers/auth.controllers')
const handleImgUpload = require('../services/multer')

const upload = handleImgUpload('/Users/rohitmaity/Documents/project/e comerce app/backend/images/uploads') 


const router = express.Router()

router.post('/register',upload.single('img'), handleUserRegistration)
router.post('/login', handleUserLogin)
router.post('/logout', handleUserLogout)


module.exports = router
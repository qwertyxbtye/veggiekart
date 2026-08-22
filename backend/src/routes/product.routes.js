const express = require('express')
const {handleProductRegistration,handleProductUpdation,handleProductDeletion,handleGetAllProducts} = require('../controllers/product.controller')
const handleImgUpload = require('../services/multer')
const {checkAuthorization} = require('../middlewares/auth.middleware')

const upload = handleImgUpload('/Users/rohitmaity/Documents/project/e comerce app/backend/images/uploads') 

const router = express.Router()

router.post('/register', upload.single('img'), checkAuthorization(["vendor"]) , handleProductRegistration )
router.get('/getallproducts', checkAuthorization(["vendor","user"]) , handleGetAllProducts)
router.post('/update/:id' , checkAuthorization(["vendor"]), handleProductUpdation)
router.post('/delete/:id',checkAuthorization(["vendor"]) ,handleProductDeletion )


module.exports = router

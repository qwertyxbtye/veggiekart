const express = require('express')
const { handleAddToCart, handleDeleteFromCart ,handleGetCartItems,handleDecreaseQuantity} = require('../controllers/cart.controllers')
const { checkAuthorization } = require('../middlewares/auth.middleware')


const router = express.Router()

router.post('/addtocart/:productid', checkAuthorization(["user"]) , handleAddToCart)
router.get('/getcartitems', checkAuthorization(["user"]), handleGetCartItems)
router.post('/decreasequantity/:productid', checkAuthorization(["user"]) , handleDecreaseQuantity)
router.post('/removefromcart/:productid', checkAuthorization(["user"]) , handleDeleteFromCart)

module.exports = router

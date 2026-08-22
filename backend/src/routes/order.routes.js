const express = require('express')
const {handleOrderPlacement,handleGetUserOrder,handleGetAllOrder,handleStatusUpdate} = require('../controllers/order.controller')
const {checkAuthorization} = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/placeorder',checkAuthorization(['user']), handleOrderPlacement)
router.get('/getmyorders' ,checkAuthorization(['user']),handleGetUserOrder)
router.get('/getallorders' ,checkAuthorization(['vendor']),handleGetAllOrder)
router.post('/updateorderstatus' ,checkAuthorization(['vendor']),handleStatusUpdate)

module.exports = router
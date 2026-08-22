require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./src/db/db')
const authRouter = require('./src/routes/auth.routes')
const productRouter = require('./src/routes/product.routes')
const orderRouter = require('./src/routes/order.routes')
const cartRouter = require('./src/routes/cart.routes')
const {checkLoginStatus} = require('./src/middlewares/auth.middleware')
const { handleGetVegetables } = require('./src/services/chatbot')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true}))

connectDB(process.env.MONGO_URL)

app.use('/auth', authRouter)
app.use('/product',checkLoginStatus, productRouter)
app.use('/order',checkLoginStatus, orderRouter)
app.use('/cart',checkLoginStatus, cartRouter)
app.post('/chatbot/getvegetables', handleGetVegetables)

app.listen(process.env.PORT , 
    console.log("Server Running on localhost:3000")
)
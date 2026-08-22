const { json } = require('express');
const ORDER = require('../models/order.model');
const PRODUCT = require('../models/product.model');

async function handleOrderPlacement(req,res) {
    
    const user = req.user
    const detaileduser = await user.populate('bag.product')

    //  console.log('detaildetuser',detaileduser.bag[0].product);
    if(!user) return res.status(400).send('user not found')

    try {
        
        const { _id, bag, address } = detaileduser
        const {total,paymentStatus} = req.body

        if(!_id || bag.length === 0 || !address || !total) return res.status(400).send('user not found')


        
        const items = detaileduser.bag.map(p => { return {product:p.product,quantity:p.quantity} })

        const order = await ORDER.create({
            customer_id: _id,
            items: items,
            delivery_address: address,
            totalAmount:total,
            payment_status:String(paymentStatus)
        })

        while(user.bag.length > 0) {
            user.bag.pop()
        }

        await user.save()
        console.log("items removed from cart",user.bag);
        

        res.status(201).json({ msg: "Order placed"}, order)
        
    } catch (error) {
        
        console.log(error);
        
    }

}

async function handleGetUserOrder(req,res) {
    
    const user = req.user

    const orders = await ORDER.find({customer_id: user._id})

    if(!orders) return res.json({msg: "order not found"})

    const detailedOrders = await Promise.all( orders.map( (order) => order.populate('items.product')) )

    res.status(200).json({msg: "orders fetched",detailedOrders})
}


async function handleGetAllOrder(req,res) {

    const orders = await ORDER.find({})

    
    const detailedOrders = await Promise.all( orders.map( (order) => order.populate('customer_id items.product')))
    if(detailedOrders.length === 0) return res.json({msg: "orders not found"})

    res.status(200).json({msg: "orders fetched", detailedOrders})
}

async function handleStatusUpdate(req,res) {

    const { orderid, status} = req.body
    
    const order = await ORDER.findByIdAndUpdate({_id: orderid},{status},{new:true})
    console.log('order',order);



    res.status(200).json({msg: "order status updated"})

}


module.exports = {handleOrderPlacement,handleGetUserOrder,handleGetAllOrder,handleStatusUpdate}
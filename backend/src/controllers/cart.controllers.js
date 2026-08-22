const PRODUCT = require("../models/product.model")
const USER = require("../models/user.model")


async function handleAddToCart(req,res) {
    
    const user = req.user
    const productid = req.params.productid


    // user.bag.pop()
    // await user.save()

    if(!user || !productid ) return res.send('cart error')

    try {
        
        const product = await PRODUCT.findOne({_id:productid})
        if(!product) return res.send("product not found")


        
        const productexists = user.bag.find( p => p.product.toString() === productid )

        if (productexists) {
            const newbag = user.bag.map( p => p.product.toString() === productid ? {...p,quantity: p.quantity + 1}: p) 
            user.bag = newbag
            await user.save()
            return res.json({msg: "1 more " + product.name + " added to cart", bag:user.bag})

        } else {
            user.bag.push({product:productid,quantity:1})
        
            await user.save()

            res.status(201).json({msg: product.name + " added to cart",bag: user.bag })
        }
    
        
    } catch (error) {
        res.send(error)
    }

}

async function handleDeleteFromCart(req,res) {
    
    const user = req.user
    const productid = req.params.productid
    
    if(!user || !productid) return res.send('user not found')

    const indexofproduct = user.bag.map(p =>{ return p.product.toString()}).indexOf(productid);

    if(indexofproduct === -1) return res.status(200).json({msg: "item not in cart"})

    const detailedUser = await user.populate('bag.product')
    
    
    detailedUser.bag.splice(indexofproduct,1);
    user.bag = detailedUser.bag
    await user.save()
    res.status(200).json({msg: "item removed from cart", bag:detailedUser.bag})
    
}

async function handleGetCartItems(req,res) {
    
    const user = req.user

    if(!user) return res.status(200).json({msg: "please login"})

    if(user.bag.length === 0) return res.status(200).json({msg: "no items in cart", address: user.address})

    const deatileduser = await user.populate('bag.product')
    const userbag = deatileduser.bag

    res.status(200).json({msg: "items in cart", userbag, address: user.address})
}

async function handleDecreaseQuantity(req,res) {
    
    const user = req.user
    const productid = req.params.productid

    if(!user || !productid) return res.send('cart error')

    const detailedUser = await user.populate('bag.product')

    const newbag = detailedUser.bag.map( p => p.product._id.toString() === productid ? {...p,quantity: p.quantity - 1}: p)
    const qtyZero = detailedUser.bag.find( p => p.quantity === 1)
    // if(qtyZero) console.log(qtyZero._id.toString())
    
    user.bag = newbag
    await user.save()
    return res.json({msg: 'item removed from cart', bag:user.bag})  

}
module.exports = {handleAddToCart,handleDeleteFromCart,handleGetCartItems,handleDecreaseQuantity}
const PRODUCT = require("../models/product.model");
const getImageUrl = require('../services/imagekit')
const fs = require("fs");

async function handleProductRegistration(req, res) {
  try {
    const product = req.body;
    const imgfile = req.file;

    if (!product || !imgfile) return res.send("please enter product details correctly");

    const imgdetails = await getImageUrl(imgfile)

    if(!imgdetails) return res.send('imagekit error')
    
    await fs.unlink(req.file.path, err => {
        if (err) console.log(error);
        console.log('image unlinked successfully');
    })


    const { name,weight, category, price, isAvailable } = product;

    const createdproduct = await PRODUCT.create({
      name,
      weight,
      category,
      price,
      isAvailable,
      img: imgdetails.url,
    });

    if(!createdproduct) return res.status(500).json({ msg: "Product could not be Added."});
    res.status(201).json({ msg: "Product added", createdproduct });
  } catch (error) {
    console.log("error:",error);
  }
}

async function handleProductUpdation(req, res) {
  const product_id = req.params.id;
  const updated_details = req.body;

  if (!product_id || !updated_details)
    res.send("please enter product details correctly");
  

  const product_updated = await PRODUCT.findByIdAndUpdate(
    { _id: product_id },
    updated_details,
  );

  if(!product_updated) return res.send("product not found")
  res.status(200).json({ msg: "Product updated", product_updated });
}

async function handleProductDeletion(req, res) {
  const product_id = req.params.id;

  if (!product_id) res.send("product not found");

  const deletedproduct = await PRODUCT.findByIdAndDelete({ _id: product_id });

  if(!deletedproduct) return res.send("product not found")

  res.status(200).json({ msg: "Product deleted", deletedproduct });
}

async function handleGetAllProducts(req, res) {
  
  try {
    const allproduct = await PRODUCT.find({})

    if(allproduct.length === 0 ) return res.json({msg: 'No veggies in inventory'})

    res.status(200).json({msg: 'fetched all veggies', allproduct})
  } catch (error) {
    console.log(error);
    
  }
}


module.exports = {
  handleProductRegistration,
  handleProductUpdation,
  handleProductDeletion,
  handleGetAllProducts
};

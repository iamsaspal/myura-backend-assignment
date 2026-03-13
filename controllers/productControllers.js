const {Product} = require("../models");
const { validationResult } = require("express-validator");

exports.getProducts = async (req,res)=>{

try{

const products = await Product.findAll()

res.json(products)

}catch(err){

res.status(500).json({message:"Server error"})

}

};


exports.addProduct = async (req,res)=>{


const errors = validationResult(req)

if(!errors.isEmpty()){
return res.status(400).json({errors: errors.array()})
}

const {product_name,price,category,stock} = req.body

if(!product_name || !price || !category || !stock){

return res.status(400).json({message:"All fields required"})

}

try{

const product = await Product.create({
product_name,
price,
category,
stock
})

res.status(201).json(product)

}catch(err){

res.status(500).json({message:"Error creating product"})

}

};


exports.updateStock = async (req,res)=>{


const errors = validationResult(req)

if(!errors.isEmpty()){
return res.status(400).json({errors: errors.array()})
}

const id = req.params.id
const {stock} = req.body

try{

const product = await Product.findByPk(id)

if(!product){

return res.status(404).json({message:"Product not found"})

}

product.stock = stock
await product.save()

res.json(product)

}catch(err){

res.status(500).json({message:"Server error"})

}

};
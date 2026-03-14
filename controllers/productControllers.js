const {Product} = require("../models");
const { validationResult } = require("express-validator");
const logger = require("../utils/logger")

exports.getProducts = async (req,res)=>{

try{

const page = parseInt(req.query.page) || 1
const limit = parseInt(req.query.limit) || 10

const offset = (page - 1) * limit

const {count,rows} = await Product.findAndCountAll({

limit: limit,
offset: offset,
order:[["createdAt","DESC"]]

})

const totalPages = Math.ceil(count / limit)

res.json({
products: rows,
totalPages: totalPages
})

}catch(err){

logger.error(err.message)

res.status(500).json({message:"Server error"})

}

};


exports.addProduct = async (req,res)=>{

try{

const {product_name, price, category, stock} = req.body

/* VALIDATION */

if(!product_name || !price || !category){
return res.status(400).json({
message:"All fields are required"
})
}

if(stock < 0){
return res.status(400).json({
message:"Stock cannot be negative"
})
}

/* CHECK EXISTING PRODUCT */

const existingProduct = await Product.findOne({
where:{
product_name,
category
}
})

/* IF PRODUCT EXISTS → UPDATE STOCK */

if(existingProduct){

existingProduct.stock += Number(stock)

await existingProduct.save()

return res.status(200).json({
message:"Product already exists. Stock updated successfully"
})

}

/* CREATE NEW PRODUCT */

await Product.create({
product_name,
price,
category,
stock
})

res.status(200).json({
message:"Product added successfully"
})

}catch(err){

logger.error(err.message)

res.status(500).json({message:"Server error"})

}

}


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

product.stock = product.stock + Number(stock)
await product.save()

res.json(product)

}catch(err){

logger.error(err.message)

res.status(500).json({message:"Server error"})

}
};
exports.updateStockFromUI = async (req,res)=>{

try{

const {product_id,stock} = req.body

/* VALIDATION */

if(!product_id){
return res.status(400).json({
message:"Please select product"
})
}

if(stock === undefined || stock < 0){
return res.status(400).json({
message:"Stock value required"
})
}

/* FIND PRODUCT */

const product = await Product.findByPk(product_id)

if(!product){
return res.status(404).json({
message:"Product not found"
})
}

/* UPDATE STOCK */

product.stock = product.stock + Number(stock)

await product.save()

return res.status(200).json({
message:"Stock updated successfully"
})

}catch(err){

logger.error(err.message)

res.status(500).json({message:"Server error"})

}

};

// exports.updateProduct = async (req,res)=>{

// const id = req.params.id

// const {product_name,price,category} = req.body

// await Product.update(

// {product_name,price,category},

// {where:{id}}

// )

// res.json({message:"Product updated"})

// };


exports.deleteProduct = async (req,res)=>{

try{

const id = req.params.id

const product = await Product.findByPk(id)

if(!product){
return res.status(404).json({
message:"Product not found"
})
}

await product.destroy()

res.status(200).json({
message:"Product deleted successfully"
})

}catch(err){

logger.error(err.message)

res.status(500).json({message:"Server error"})

}

};

exports.updateProduct = async (req,res)=>{

try{

const id = req.params.id

const {product_name, price, category, stock} = req.body

/* VALIDATION */

if(!product_name || !price || !category){
return res.status(400).json({
message:"All fields are required"
})
}

const product = await Product.findByPk(id)

if(!product){
return res.status(404).json({
message:"Product not found"
})
}

/* UPDATE PRODUCT */

product.product_name = product_name
product.price = price
product.category = category

if(stock !== undefined){
product.stock = stock
}

await product.save()

res.status(200).json({
message:"Product updated successfully"
})

}catch(err){

logger.error(err.message)

res.status(500).json({message:"Server error"})

}

}


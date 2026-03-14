const { Order, OrderItem, Product } = require("../models")

exports.placeOrder = async (req,res)=>{

try{

const {customer_name, customer_email, product_id, quantity} = req.body

if(!customer_name || !customer_email){
return res.status(400).json({message:"Customer details required"})
}

if(!product_id){
return res.status(400).json({message:"Please select product"})
}

if(!quantity || quantity <= 0){
return res.status(400).json({message:"Quantity must be greater than 0"})
}

const product = await Product.findByPk(product_id)

if(!product){
return res.status(404).json({message:"Product not found"})
}

if(product.stock < quantity){
return res.status(400).json({message:"Insufficient stock"})
}

const order = await Order.create({
customer_name,
customer_email
})

await OrderItem.create({
order_id: order.id,
product_id,
quantity
})

product.stock = product.stock - quantity
await product.save()

res.status(200).json({
success:true,
message:"Order placed successfully"
})

}catch(err){

console.log(err)

res.status(500).json({message:"Order failed"})

}

};


exports.getOrders = async (req,res)=>{

try{

const page = parseInt(req.query.page) || 1
const limit = parseInt(req.query.limit) || 10

const offset = (page-1)*limit

const {count,rows} = await Order.findAndCountAll({

include:[
{
model: OrderItem,
include:[
{
model: Product,
attributes:["product_name"]
}
]
}
],

order:[["createdAt","DESC"]],

limit,
offset

})

const totalPages = Math.ceil(count/limit)

res.json({
orders:rows,
totalPages
})

}catch(err){

res.status(500).json({message:"Server error"})

}

};